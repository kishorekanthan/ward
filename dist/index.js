import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Fa, useContext as ge, createContext as $e, useState as v, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as Qe, useId as y, Fragment as za, isValidElement as Ll, Children as ja } from "react";
import { createPortal as Ml, flushSync as Wa } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Qn = (e) => String(e).padStart(2, "0");
function Tn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Qn(t % 60)}s` : `${Math.floor(a / 60)}h ${Qn(a % 60)}m`;
}
const Al = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const t = Al.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = t.find((o) => o.type === r)) == null ? void 0 : l.value) ?? "";
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
function ne(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Ka(e, t) {
  return `${e} / ${t}`;
}
const Il = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function El(e) {
  return Il.format(new Date(e));
}
const Ga = $e(/* @__PURE__ */ new Set());
function $L({ hidden: e, children: t }) {
  const a = Fa(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ga.Provider, { value: a, children: t });
}
function Bl(e) {
  return !ge(Ga).has(e);
}
function CL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Bl(e) ? t : a });
}
const Pl = "(prefers-color-scheme: dark)", ql = "(prefers-contrast: more)";
function Xn(e) {
  return typeof window.matchMedia == "function" ? window.matchMedia(e) : null;
}
function Zn(e, t) {
  const [a, r] = v(() => {
    var l;
    return ((l = Xn(e)) == null ? void 0 : l.matches) === !0;
  });
  return S(() => {
    const l = t ? Xn(e) : null;
    if (!l) return;
    const o = () => r(l.matches);
    return o(), l.addEventListener("change", o), () => l.removeEventListener("change", o);
  }, [e, t]), a;
}
function Ct(e, t) {
  S(() => {
    if (t === null) return;
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Ol(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Dl(e, t) {
  return e === "system" ? t ? "more" : null : e === "more" ? "more" : null;
}
function SL({ theme: e, accent: t = "green", density: a = "comfortable", contrast: r = "standard", children: l }) {
  const o = Zn(Pl, e === "system"), s = Zn(ql, r === "system");
  return Ct("data-theme", Ol(e, o)), Ct("data-accent", t), Ct("data-density", a), Ct("data-contrast", Dl(r, s)), /* @__PURE__ */ n(x, { children: l });
}
const Hl = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Fl(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function zl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function jl(e, t, a, r) {
  return e.shiftKey ? Fl(t, a) ? r : void 0 : document.activeElement === r || zl(t) ? a : void 0;
}
function Wl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const o = jl(e, t, r, l);
  o && (e.preventDefault(), o.focus());
}
function Kl(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Hl));
      Wl(a, e.current, r);
    },
    [e]
  ) };
}
function RL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, o;
      (o = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || o.call(l);
    };
  }, [t, e]);
}
const ea = { ArrowUp: -1, ArrowDown: 1 }, ta = { ArrowLeft: -1, ArrowRight: 1 }, Gl = (e, t, a) => Math.min(a, Math.max(t, e));
function Ul(e, t) {
  if (t !== "horizontal" && e in ea) return ea[e];
  if (t !== "vertical" && e in ta) return ta[e];
}
function Jt({ orientation: e = "both" } = {}) {
  const [t, a] = v(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  Qe(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], m = l.current;
    l.current = !1, a(h), m && ((_ = r.current.get(h)) == null || _.focus());
  });
  const o = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const m = Math.max(0, h.indexOf(t)), _ = Ul(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Gl(m + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = Z(
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
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: o };
}
const xL = (e, t, a) => {
  const r = new EventSource(e), l = (o) => a.onEvent(o.data, o.lastEventId, o.type);
  r.onmessage = l;
  for (const o of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(o, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, TL = "0.2.0", LL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Vl = [1, 2, 3, 4, 5, 6], Ua = [1, 2, 3], Yl = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], ML = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], AL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], IL = [{ name: "standard", label: "Standard" }, { name: "more", label: "High" }], P = {
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
}, ye = {
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
function Ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Qt(e) {
  return Vl.includes(e);
}
function yt(e) {
  return Ua.includes(e);
}
function Jl(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function EL(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ql = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Xl(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return Ql[e];
}
function na(e) {
  return typeof e != "string" ? null : Yl.includes(e) ? e : null;
}
function Zl(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function eo(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function to(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function no(e, t, a) {
  const r = Zl(e);
  if (r === null) return null;
  const l = na(a) ?? na(r.type);
  return l === null ? null : { ...r, type: l, id: eo(r, t), at: to(r) };
}
function ao(e, t) {
  return e >= ye.staleAfter ? "stale" : e >= ye.heartbeat && t === "live" ? "reconnecting" : null;
}
function ro(e, t, a) {
  return e >= ye.heartbeat && !t && a !== null;
}
function BL(e, t) {
  const [a, r] = v("reconnecting"), [l, o] = v(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), m = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), M = Z((A) => {
    k.current = A, r(A);
  }, []), O = Z(() => {
    c.current = Date.now();
  }, []), we = Z((A) => {
    for (const [V, Se] of s.current)
      (Se === "*" || A.itemKey === Se) && V(A);
  }, []), ae = Z(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (A, V, Se) => {
        const Ge = no(A, V, Se);
        Ge !== null && (Ge.id && (d.current = Ge.id), O(), N.current = !1, M("live"), o(Ge.at), we(Ge));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, O(), M("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && M("reconnecting");
        const A = Math.min(ye.reconnectBase * 2 ** u.current, ye.reconnectMax);
        u.current += 1, m.current = window.setTimeout(ae, A);
      }
    });
  }, [we, M, O, t, e]), Ce = Z((A) => {
    N.current = !0, A.close(), h.current = null, m.current = window.setTimeout(ae, ye.reconnectBase);
  }, [ae]), Ze = Z((A, V) => (s.current.set(V, A), () => {
    s.current.delete(V);
  }), []);
  return S(() => (ae(), _.current = window.setInterval(() => {
    const A = Date.now() - c.current, V = ao(A, k.current);
    V && M(V);
    const Se = h.current;
    ro(A, N.current, Se) && Ce(Se);
  }, ye.tick), () => {
    var A;
    window.clearInterval(_.current), window.clearTimeout(m.current), N.current = !1, (A = h.current) == null || A.close(), h.current = null;
  }), [ae, Ce, M]), { connection: a, lastEventAt: l, subscribe: Ze };
}
function Mn(e, t) {
  const a = new Date(e).getTime(), [r, l] = v(() => Date.now());
  return S(() => {
    if (!t) return;
    const o = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    o();
    const s = window.setInterval(o, ye.tick);
    return document.addEventListener("visibilitychange", o), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", o);
    };
  }, [t, a]), Math.max(0, r - a);
}
const lo = { blue: "running", orange: "waiting", green: "done" };
function oo() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function aa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Bt(e, t) {
  const a = f(0), r = Z((l) => {
    const o = l ?? t, s = e.current;
    s !== null && o !== void 0 && (oo() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${lo[o]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => aa(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => aa(s), ye.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const io = "_root_1otpc_2", so = {
  root: io
};
function co(e, t, a, r, l) {
  const o = [Tn(t)];
  return e || o.push(`as of ${El(a)}`), r && o.push(`turn ${r[0]}/${r[1]}`), l && o.push(l.label), o;
}
function Pe({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", o = Mn(e, l), s = (t == null ? void 0 : t.at) ?? e, c = co(l, o, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${so.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const uo = "_app_ge95k_1", ho = "_side_ge95k_35", mo = "_sideTop_ge95k_46", wo = "_sideBody_ge95k_60", _o = "_foldSlot_ge95k_86", fo = "_iconRail_ge95k_110", vo = "_railItem_ge95k_119", bo = "_railIcon_ge95k_140", go = "_railDot_ge95k_145", po = "_railLetter_ge95k_151", yo = "_main_ge95k_157", No = "_rail_ge95k_119", ko = "_page_ge95k_179", $o = "_headerRow_ge95k_202", Co = "_sidebarToggle_ge95k_209", So = "_headerSlot_ge95k_214", Ro = "_headerAction_ge95k_219", xo = "_drawerSide_ge95k_224", To = "_root_ge95k_271", Lo = "_topbar_ge95k_278", Mo = "_mark_ge95k_289", Ao = "_brand_ge95k_296", Io = "_tagline_ge95k_302", Eo = "_identity_ge95k_308", Bo = "_tools_ge95k_309", Po = "_nav_ge95k_319", qo = "_metadata_ge95k_326", Oo = "_actor_ge95k_341", Do = "_detail_ge95k_342", Ho = "_content_ge95k_387", Fo = "_toolsPanel_ge95k_403", zo = "_skip_ge95k_429", $ = {
  app: uo,
  side: ho,
  sideTop: mo,
  sideBody: wo,
  foldSlot: _o,
  iconRail: fo,
  railItem: vo,
  railIcon: bo,
  railDot: go,
  railLetter: po,
  main: yo,
  rail: No,
  page: ko,
  headerRow: $o,
  sidebarToggle: Co,
  headerSlot: So,
  headerAction: Ro,
  drawerSide: xo,
  root: To,
  topbar: Lo,
  mark: Mo,
  brand: Ao,
  tagline: Io,
  identity: Eo,
  tools: Bo,
  nav: Po,
  metadata: qo,
  actor: Oo,
  detail: Do,
  content: Ho,
  toolsPanel: Fo,
  skip: zo
};
function dt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const jo = "_scope_1an6i_2", Wo = {
  scope: jo
}, Va = $e(null);
function PL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Wo.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Va.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function qe() {
  return ge(Va);
}
function Xt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : dt(e, t.reasonId);
}
const Ko = "_btn_1mk1f_2", Go = "_primary_1mk1f_14", Uo = "_destructive_1mk1f_25", Vo = "_secondary_1mk1f_35", Yo = "_ghost_1mk1f_40", Jo = "_overflow_1mk1f_49", Qo = "_sm_1mk1f_56", Xo = "_disabled_1mk1f_60", Zo = "_withReason_1mk1f_68", ei = "_reason_1mk1f_74", lt = {
  btn: Ko,
  primary: Go,
  destructive: Uo,
  secondary: Vo,
  ghost: Yo,
  overflow: Jo,
  sm: Qo,
  disabled: Xo,
  withReason: Zo,
  reason: ei
};
function ti(e, t, a, r) {
  const l = t === "sm" ? [lt.sm, "ward-btn--sm"] : [], o = a ? [lt.disabled] : [];
  return [lt.btn, lt[e], "ward-btn", `ward-btn--${e}`, ...l, ...o, r ?? ""].filter(Boolean).join(" ");
}
function ni(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ai(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function ri(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function li(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function oi(e, t, a) {
  return li(e.describedBy, t && a);
}
function ii({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${lt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function si(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = qe()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(ci, { ...e });
}
function ci(e) {
  const t = qe();
  ai(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), o = ri(e, t), s = y(), c = di(o, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ti(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: o,
        "aria-describedby": oi(e, o, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ni(a, e.controls),
        children: si(e)
      }
    ),
    /* @__PURE__ */ n(ii, { id: s, reason: o, shown: c === Ya })
  ] });
}
function di(e, t) {
  return e && !t ? Ya : za;
}
function Ya({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${lt.withReason} ward-btn-withReason`, children: e });
}
let An = "none";
function ui(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (An = "key");
}
typeof document < "u" && (document.addEventListener("keydown", ui, !0), document.addEventListener("pointerdown", () => {
  An = "pointer";
}, !0));
function hi() {
  return An === "key";
}
function gt(e) {
  const [t, a] = v(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var o;
    const r = (o = window.matchMedia) == null ? void 0 : o.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const mi = "_scrim_1cawq_2", wi = "_drawer_1cawq_10", _i = "_sheet_1cawq_14", fi = "_modal_1cawq_18", vi = "_panel_1cawq_23", bi = "_start_1cawq_44", gi = "_header_1cawq_67", pi = "_title_1cawq_75", yi = "_body_1cawq_79", Ni = "_close_1cawq_106", Ae = {
  scrim: mi,
  drawer: wi,
  sheet: _i,
  modal: fi,
  panel: vi,
  start: bi,
  header: gi,
  title: pi,
  body: yi,
  close: Ni
}, ki = $e(null), Dt = [], Ht = /* @__PURE__ */ new Map();
function $i(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ci(e, t) {
  let a = Ht.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Ht.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Si(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !$i(r) && Ci(e, r);
}
function Ri(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Si(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function xi(e) {
  for (const t of e.claims) {
    const a = Ht.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Ht.delete(t)));
  }
}
function Ti(e, t) {
  const a = { root: e, claims: [] };
  return Dt.push(a), Ri(a, t), a;
}
function Li(e) {
  const t = Dt.indexOf(e);
  t >= 0 && Dt.splice(t, 1), xi(e);
}
function ra(e) {
  return e !== null && Dt.at(-1) === e;
}
function Mi(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const o = e.current;
    if (!o) return;
    const s = document.activeElement, c = Ti(o, t);
    return r.current = c, () => {
      var u, h;
      const d = ra(c);
      Li(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Z(() => ra(r.current), []);
}
function Ai(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ii(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ei({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Ae.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ae.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Bi(e) {
  return `${Ae.scrim} ${Ae[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Pi(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Ae.panel} ${Ae[e]} ward-overlay-panel${a}${r}`;
}
function qi(e) {
  const t = ge(ki);
  return e ?? t ?? document.body;
}
function ut(e) {
  const t = f(null), a = f(null), r = y(), l = qi(e.container), o = gt("(min-width: 768px)"), s = Ai(e.kind, o), c = Ii(e, r), d = Kl(a), [u] = v(hi), h = Mi(t, l, e.returnFocusTo), m = Z(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var _;
    h() && ((_ = a.current) == null || _.focus());
  }, [h]), S(() => {
    const _ = (N) => {
      N.key === "Escape" && m();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [m]), Ml(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Bi(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: m,
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
            className: Pi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ae.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ei, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Oi = /^([a-z][a-z0-9+.-]*):/i, Di = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Hi = "#";
function Fi(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = Oi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function T(e) {
  const t = Fi(e);
  return t === void 0 || Di.has(t) ? e : Hi;
}
function zi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ja(e) {
  const t = zi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ji(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ja(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const o of [a, ...a.children]) l == null || l.observe(o);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function Wi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function Ki(e, t, a) {
  Qe(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const o = Wi(r, l);
    o !== null && (r.scrollLeft = Math.max(0, o)), Ja(r);
  }, [e, t, a]);
}
const Gi = "_row_11g8i_2", Ui = {
  row: Gi
};
function Vi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function In({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: o, className: s, ...c }) {
  const d = f(null), u = o ?? d;
  return ji(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Ui.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Vi(l, r), ...c, children: t });
}
const Yi = "_icon_1ylqy_2", Ji = {
  icon: Yi
};
function Nt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Ji.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function qL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function OL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function DL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function HL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Qi() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Qa = "ward:sidebar-collapsed", Xi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Zi() {
  try {
    return window.localStorage.getItem(Qa) === "true";
  } catch {
    return !1;
  }
}
function es(e) {
  try {
    window.localStorage.setItem(Qa, String(e));
  } catch {
  }
}
function ts(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ns(e) {
  return e instanceof Element && e.closest(Xi) !== null;
}
function as(e) {
  return e.key === "[" && !ts(e) && !ns(e.target);
}
function rs(e) {
  const [t, a] = v(Zi), r = () => {
    es(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (o) => {
      var c;
      if (!as(o)) return;
      const s = o.target instanceof Element ? o.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function ls() {
  const e = gt("(max-width: 767.98px)"), t = gt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function os(e) {
  const t = e === "phone", a = y(), r = f(null), [l, o] = v(!1);
  return l && !t && o(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => o(!l), close: () => o(!1) };
}
function is({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e }),
    tr(t) && /* @__PURE__ */ n("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function ss(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function cs({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (ss(a.open, a.close), !a.open) return null;
  const r = (o) => {
    o.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ut, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: Xa(e, !1) }) });
}
function ds(e) {
  const [t, a] = v(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function us(e, t) {
  const a = rs(e === "wide" && !t), r = ds(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function hs(e, t) {
  const a = us(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ws(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const ms = (e) => e.collapsed && e.drawsStrip;
function ws(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const la = (e) => e ? "" : void 0;
function Xa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Za({ fold: e }) {
  const t = e.collapsed ? "Expand sidebar" : "Collapse sidebar";
  return /* @__PURE__ */ n("span", { className: $.foldSlot, "data-ward-tip": t, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Qi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t })
  ] }) });
}
function _s({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(Za, { fold: e }) });
}
const er = $e(null);
function FL() {
  const e = ge(er);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Za, { fold: e });
}
function fs({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Ln(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function vs({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: $.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(fs, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function bs({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const o = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(_s, { fold: r, inSidebar: l && !o }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: o, children: Xa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(vs, { items: a ?? [], label: t })
  ] });
}
const tr = (e) => e != null;
function gs(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: o, iconRail: s, pageFill: c } = e, d = tr(o), u = ls(), h = os(u), m = hs(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(m.collapsed), "data-consumer-fold": la(ms(m)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(er.Provider, { value: m, children: /* @__PURE__ */ n(bs, { sidebar: t, label: _, iconRail: s, fold: m, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(is, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: $.page, "data-fill": la(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: $.rail, children: o }),
    /* @__PURE__ */ n(cs, { sidebar: t, label: _, drawer: h })
  ] });
}
function ps({ destinations: e, active: t }) {
  const a = f(null);
  return Ki(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(In, { as: "nav", rowRef: a, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function bn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function ys({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(bn, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(bn, { value: t, className: $.detail })
  ] });
}
function Ns() {
  const e = gt("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = v(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function ks({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: $.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function $s({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Cs(e) {
  return /* @__PURE__ */ i("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(bn, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(ps, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(ys, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ks, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ss(e) {
  const t = y(), a = Ns();
  return /* @__PURE__ */ i("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Cs, { ...e, menu: a }),
    /* @__PURE__ */ n($s, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: $.content, children: e.children })
  ] });
}
function Rs(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function zL(e) {
  return Rs(e) ? /* @__PURE__ */ n(gs, { ...e }) : /* @__PURE__ */ n(Ss, { ...e });
}
const xs = "_root_itg9o_2", Ts = "_row_itg9o_8", Ls = "_box_itg9o_14", Ms = "_label_itg9o_21", As = "_labelHidden_itg9o_26", Is = "_consequence_itg9o_44", Es = "_sample_itg9o_79", Ve = {
  root: xs,
  row: Ts,
  box: Ls,
  label: Ms,
  labelHidden: As,
  consequence: Is,
  sample: Es
};
function Bs(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Ps({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Ve.consequence} ward-check-consequence`, children: t }) : null;
}
function qs(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Os(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, o = qs(e, a, r), s = o ? `${t}-reason` : void 0, c = Xt(dt(l, e.describedBy, s), r);
  return { noteId: l, reason: o, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? o } };
}
function Ds({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Hs({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.sample, "aria-hidden": "true", children: e }) : null;
}
function nr(e) {
  const t = y(), a = qe(), r = Bs(e, a), l = Os(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Ve.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Ve.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Ve.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, o.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ n("label", { htmlFor: t, className: e.labelHidden ? Ve.labelHidden : Ve.label, children: e.label }),
      /* @__PURE__ */ n(Hs, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Ds, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(Ps, { id: l.noteId, text: e.consequence })
  ] });
}
const Fs = "_chip_pq6tb_2", zs = {
  chip: Fs
}, js = {
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
function Ws(e, t) {
  if (e === "stream") return Ks(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = js[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Ks(e) {
  if (!e || !yt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Ln(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function w({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${zs.chip} ward-chip ward-chip--${e}`, style: Ws(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Gs = "_clamp_zn74g_3", oa = {
  clamp: Gs
};
function st({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? oa.clamp : `${oa.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Us = "_root_1btz3_2", Vs = "_body_1btz3_10", Ys = "_toggle_1btz3_24", ln = {
  root: Us,
  body: Vs,
  toggle: Ys
};
function jL({ children: e, lines: t = 3, label: a }) {
  const [r, l] = v(!1), o = y();
  return /* @__PURE__ */ i("div", { className: ln.root, children: [
    /* @__PURE__ */ n("div", { id: o, className: ln.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: ln.toggle, "aria-expanded": r, "aria-controls": o, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Js = "_root_1a4s8_2", Qs = "_words_1a4s8_16", Xs = "_title_1a4s8_23", Zs = "_actions_1a4s8_27", St = {
  root: Js,
  words: Qs,
  title: Xs,
  actions: Zs
};
function WL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: St.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: St.words, children: [
      /* @__PURE__ */ n("strong", { className: St.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: St.actions, children: a })
  ] });
}
const ec = "_root_8zmpu_2", tc = "_step_8zmpu_12", nc = "_dot_8zmpu_38", ac = "_label_8zmpu_51", _t = {
  root: ec,
  step: tc,
  dot: nc,
  label: ac
}, rc = { done: ", done", now: ", current", next: "" };
function lc({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: _t.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${_t.dot} ward-running` : _t.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: _t.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: rc[e.state] })
  ] });
}
function KL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: _t.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(lc, { step: r, running: t }, r.label)) });
}
function Zt(e) {
  return typeof e == "number" && yt(e) ? e : null;
}
function ke(e, t) {
  const a = Zt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function En(e, t) {
  const a = Zt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const oc = "_root_13eei_3", ic = "_nav_13eei_8", sc = "_list_13eei_16", cc = "_item_13eei_24", dc = "_link_13eei_44", uc = "_sep_13eei_54", hc = "_current_13eei_58", mc = "_chips_13eei_62", De = {
  root: oc,
  nav: ic,
  list: sc,
  item: cc,
  link: dc,
  sep: uc,
  current: hc,
  chips: mc
};
function wc({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: De.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${De.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function _c({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: De.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: De.nav, children: [
    /* @__PURE__ */ n("ol", { className: De.list, children: e.map((r, l) => /* @__PURE__ */ i("li", { className: De.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(wc, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${De.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(w, { ...r }, r.label)) }) : null
  ] }) });
}
function ar(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (o) => {
      var s;
      (s = t.current) != null && s.contains(o.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const fc = 500;
function rr(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function lr() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, fc), e.current);
}
const Rt = 4;
function vc(e, t, a) {
  const r = Math.max(0, a - e.bottom - Rt * 2), l = Math.max(0, e.top - Rt * 2);
  return t <= r || r >= l ? { top: e.bottom + Rt, maxHeight: r } : { top: e.top - Rt - Math.min(t, l), maxHeight: l };
}
function bc(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, o = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = o[r] || !o[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function gc(e, t, a, r) {
  return { ...vc(e, t.height, a.height), left: bc(e, t.width, a.width, r) };
}
function Pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function pc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function yc(e, t, a) {
  const r = pc(t, a);
  e.style.setProperty("--ward-anchor-width", Pt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: r, box: l, view: { width: o.clientWidth, height: o.clientHeight } };
}
function Nc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function ia(e, t, a, r) {
  const l = Nc(e), o = yc(e, t, r), s = gc(o.edges, o.box, o.view, a);
  Object.assign(e.style, { left: Pt(s.left - o.box.left), top: Pt(s.top - o.box.top), maxHeight: Pt(s.maxHeight) }), l();
}
function kc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function or(e, t, a = "start", r) {
  Qe(() => {
    const l = t.current, o = e.current;
    if (!l || !o) return;
    const s = kc(l), c = () => ia(l, o, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), Qe(() => {
    t.current && e.current && ia(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const $c = "_root_dbqo8_2", Cc = "_trigger_dbqo8_7", Sc = "_value_dbqo8_47", Rc = "_menu_dbqo8_65", xc = "_find_dbqo8_87", Tc = "_list_dbqo8_103", Lc = "_option_dbqo8_114", Mc = "_check_dbqo8_133", Ac = "_empty_dbqo8_144", Ne = {
  root: $c,
  trigger: Cc,
  value: Sc,
  menu: Rc,
  find: xc,
  list: Tc,
  option: Lc,
  check: Mc,
  empty: Ac
}, Ic = 7;
function Ec(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function sa(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Bc(e, t) {
  const [a, r] = v(e.defaultOpen === !0), [l, o] = v(""), [s, c] = v(() => sa(e.options, e.value)), d = (u) => {
    var h;
    Wa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: Ec(e.options, l),
    findable: e.options.length > Ic,
    show: () => {
      e.disabled || (o(""), c(sa(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      o(u), c(0);
    }
  };
}
function Pc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function qc(e) {
  const t = lr();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((o) => o.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function ir(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Oc(e) {
  return { ...ir(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function sr(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Dc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Hc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Dc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Fc({ entry: e, at: t, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === a.active || void 0,
      className: Ne.option,
      onMouseDown: (o) => o.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: Ne.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: Ne.label, children: e.option.label })
      ]
    }
  );
}
function Bn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function zc({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: Ne.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Bn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: sr(e, ir(e), () => {
      })
    }
  );
}
function jc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const o = qc(t), s = f(null);
  or(l, s);
  const c = (d) => {
    rr(d) && o(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: Ne.menu, children: [
    t.findable && /* @__PURE__ */ n(zc, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: Ne.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : Bn(t, a),
        onKeyDown: sr(t, Oc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Fc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: Ne.empty, children: "No match" })
  ] });
}
function Wc(e, t) {
  const a = e.open ? Bn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function cr(...e) {
  return e.filter(Boolean).join(" ");
}
function Kc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Gc({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const o = !e.options.some((d) => d.value === e.value), s = (c = qe()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: cr(Ne.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": dt(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Hc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: Ne.value, "data-placeholder": o || void 0, children: Kc(e) })
    }
  );
}
function dr(e) {
  const t = qe(), a = t ? { ...e, disabled: !0, "aria-describedby": Xt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, o = f(null), s = f(null), c = f(null), d = Bc(a, s), u = Pc(d.open, c);
  return ar(d.open, o, () => d.close(!1)), Wc(d, l), /* @__PURE__ */ i("div", { ref: o, className: cr(Ne.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Gc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(jc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Uc = "_field_nytdz_2", Vc = "_label_nytdz_8", Yc = "_labelHidden_nytdz_15", Jc = "_control_nytdz_25", Qc = "_mono_nytdz_45", Xc = "_area_nytdz_50", Zc = "_invalid_nytdz_57", je = {
  field: Uc,
  label: Vc,
  labelHidden: Yc,
  control: Jc,
  mono: Qc,
  area: Xc,
  invalid: Zc
}, ed = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, ur = (e) => `${e}-label`;
function td({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? ed : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function nd({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    dr,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": ur(t.id),
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
function ad({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
function rd({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, type: "date", min: e.min, max: e.max, ...t });
}
const ld = { input: td, select: nd, textarea: ad, date: rd };
function od(e, t, a) {
  const r = ld[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function id(e, t, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Xt(dt(l ? a : void 0, e.describedBy), r),
    onChange: (o) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, o.target.value);
    }
  };
}
function sd(e) {
  const t = e.mono ? [je.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function cd(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function E(e) {
  const t = y(), a = `${t}-msg`, r = id(e, t, a, qe()), l = sd(e);
  return /* @__PURE__ */ i("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: ur(t), className: cd(e.labelHidden), htmlFor: t, children: e.label }),
    od(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const dd = "_root_1giy4_2", ud = "_trigger_1giy4_9", hd = "_ghost_1giy4_27", md = "_panel_1giy4_46", wd = "_edged_1giy4_67", _d = "_menu_1giy4_73", fd = "_group_1giy4_78", vd = "_heading_1giy4_83", bd = "_item_1giy4_89", gd = "_description_1giy4_105", pd = "_large_1giy4_109", yd = "_touch_1giy4_113", Nd = "_icon_1giy4_117", kd = "_label_1giy4_125", $d = "_text_1giy4_130", Cd = "_trailing_1giy4_138", Sd = "_check_1giy4_144", Rd = "_separator_1giy4_183", xd = "_footer_1giy4_189", Td = "_find_1giy4_196", Ld = "_findGlyph_1giy4_208", Md = "_findInput_1giy4_214", Ad = "_empty_1giy4_230", L = {
  root: dd,
  trigger: ud,
  ghost: hd,
  panel: md,
  edged: wd,
  menu: _d,
  group: fd,
  heading: vd,
  item: bd,
  description: gd,
  large: pd,
  touch: yd,
  icon: Nd,
  label: kd,
  text: $d,
  trailing: Cd,
  check: Sd,
  separator: Rd,
  footer: xd,
  find: Td,
  findGlyph: Ld,
  findInput: Md,
  empty: Ad
}, hr = $e(null);
function Id(e, t) {
  const [a, r] = v({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((o) => ({ open: !0, start: l, request: o.request + 1 })),
    close: (l) => {
      var o;
      Wa(() => r((s) => ({ ...s, open: !1 }))), l && ((o = t.current) == null || o.focus());
    }
  };
}
const Ed = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Bd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Ed.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Pn(...e) {
  return e.filter(Boolean).join(" ");
}
function Pd(e, t = {}, a = "field") {
  const { ref: r, className: l, ...o } = t;
  return { ...o, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Pn(L.trigger, a === "ghost" ? L.ghost : void 0, l) };
}
function mr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), o = Id(e.defaultOpen === !0, l);
  return ar(o.open, r, () => o.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Pn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Pd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Bd(o),
        children: e.label
      }
    ),
    o.open && /* @__PURE__ */ n(hr.Provider, { value: { ...a, popup: o, button: l }, children: e.children })
  ] });
}
function qd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Od(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Dd = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Hd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Fd(e, t) {
  return e === "separator" ? e : "items" in e ? Hd(e, t) : t(e) ? e : null;
}
function zd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function jd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return zd(e.map((l) => Fd(l, r)).filter((l) => l !== null));
}
const wr = (e, t) => (e % t + t) % t;
function Fe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = wr(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Wd = (e) => e.split("").every((t) => t === e[0]);
function Kd(e, t, a) {
  const r = Wd(a), l = r ? a[0] : a, o = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = wr(o + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Gd(e) {
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
function Ud(e, t) {
  const { items: a } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Fe(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(Fe(a, e.current(), -1))],
    ["Home", () => e.focus(Fe(a, -1, 1))],
    ["End", () => e.focus(Fe(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Vd(e, t, a) {
  const r = lr(), l = Ud(e, t), o = (s) => {
    if (rr(s)) {
      if (!a) return e.focus(Kd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = l.get(s.key);
      if (!c) return o(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Yd(e) {
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
function Jd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Fe(e, -1, 1) : t;
}
function Qd(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: o, focus: s } = l.current;
    a && s(a === "first" ? Jd(o) : Fe(o, o.length, -1));
  }, [a, r]);
}
function Xd({ row: e, nav: t, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (o) => o.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (o) => {
      var s;
      if (r.disabled) return o.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Zd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function eu(e, t) {
  return Zd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function tu(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function nu() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ca(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    tu(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(nu, {}) : null
  ] });
}
function _r(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (o) => {
      e.nav.refs.current[a] = o;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...eu(t, r),
    ...Xd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...l, children: ca(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: ca(t, r) });
}
function au({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": l, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: L.heading, children: e }),
    t.map((o) => /* @__PURE__ */ n(_r, { row: o, nav: a, popup: r }, o.at))
  ] });
}
function ru({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(au, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(_r, { row: e.row, nav: t, popup: a });
}
function lu() {
  const e = ge(hr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function ou() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function iu(e, t) {
  const a = () => Fe(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(Fe(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function su({ find: e, query: t, setQuery: a, input: r, nav: l, popup: o, menuId: s }) {
  const c = iu(l, o), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(ou, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function cu(e, t) {
  const [a, r] = v(""), l = f(null), o = t !== void 0 && Dd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return o ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: jd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const du = { regular: void 0, large: L.large, touch: L.touch }, uu = (e, t) => Pn(L.panel, e ? L.edged : void 0, du[t]);
function hu({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function fr({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: o = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = lu(), h = f(null);
  or(u, h, a, l);
  const m = cu(e, r), _ = qd(m.entries), N = Gd(_.flatMap(Od).map((O) => O.item)), k = Vd(N, s, m.toFind), M = Yd(s);
  return Qd(N, s), /* @__PURE__ */ i("div", { ref: h, className: uu(l, o), ...M, children: [
    m.find && /* @__PURE__ */ n(su, { find: m.find, query: m.query, setQuery: m.setQuery, input: m.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: _.map((O, we) => /* @__PURE__ */ n(ru, { block: O, nav: N, popup: s }, we)) }),
    /* @__PURE__ */ n(hu, { find: m.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function mu(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function vr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !mu(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const wu = (e, t) => e.reduce((a, r) => a + r + t, -t);
function _u({ room: e, widths: t, more: a, gap: r }, l) {
  const o = t.map((d, u) => u);
  if (wu(t, r) <= e) return o;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of o)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return o.filter((d) => s.has(d));
}
const on = (e) => Number.parseFloat(e) || 0, da = (e) => e.getBoundingClientRect().width;
function fu(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - on(a.paddingInlineStart) - on(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), da),
    more: r ? da(r) : 0,
    gap: on(a.columnGap)
  };
}
function vu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const bu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function br(e, t, a, r = ':scope > [role="tab"]') {
  const [l, o] = v(null);
  return Qe(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = fu(s, r);
      o((u) => bu(u, d) ? u : d);
    };
    return c(), vu(s, c);
  }, [e, a, r]), l && _u(l, t);
}
const gu = "_strip_1pizx_2", pu = "_fits_1pizx_19", yu = "_probe_1pizx_27", Nu = "_moreRoot_1pizx_36", ku = "_more_1pizx_36", $u = "_tab_1pizx_55", Cu = "_count_1pizx_91", Su = "_badge_1pizx_97", U = {
  strip: gu,
  fits: pu,
  probe: yu,
  moreRoot: Nu,
  more: ku,
  tab: $u,
  count: Cu,
  badge: Su
}, gr = "More";
function Ru(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const ua = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, qn = (e) => e.badge === void 0 ? ua(e) : `${ua(e)}, ${e.badge}`;
function pr(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const xu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Tu({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${U.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : qn(e),
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
function Lu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((o) => o.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Mu({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(mr, { label: gr, className: U.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ n(fr, { align: "end", entries: e.map((r) => ({ label: qn(r), onSelect: () => a(r.id) })) }) });
}
function Au(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : xu;
}
function GL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const o = Jt({ orientation: "horizontal" }), s = Ru(e, t);
  S(() => o.setActive(s), [o.setActive, s]);
  const c = f(null);
  vr(c, l);
  const d = br(c, s, e.map(qn).join(`
`)), u = d ? e.filter((h, m) => !d.includes(m)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${pr(l)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...o.containerProps, children: [
    e.map((h, m) => /* @__PURE__ */ n(Tu, { tab: h, active: t, place: Au(o, d, m), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: gr }),
    u.length > 0 && /* @__PURE__ */ n(Mu, { tabs: u, trigger: o.itemProps(e.length), onPick: Lu(c, a) })
  ] });
}
const ha = 7, yr = "More", Iu = ":scope > a", Nr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Eu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Bu(e, t) {
  return !e || e.includes(t) ? {} : Eu;
}
function Pu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function qu({ links: e }) {
  return /* @__PURE__ */ n(mr, { label: yr, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ n(fr, { align: "end", entries: e.map((t) => ({ label: Nr(t), href: t.href })) }) });
}
function UL({ links: e, active: t, label: a, level: r }) {
  if (e.length > ha) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ha} — the set is fixed`);
  const l = f(null);
  vr(l, r);
  const o = Math.max(0, e.findIndex((d) => d.id === t)), s = br(l, o, e.map(Nr).join(`
`), Iu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: l, className: `${pr(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Pu, { link: d, current: d.id === t, place: Bu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: yr }),
    c.length > 0 && /* @__PURE__ */ n(qu, { links: c })
  ] });
}
const Ou = "_root_jws4d_3", Du = "_segment_jws4d_9", ma = {
  root: Ou,
  segment: Du
};
function kr({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: o }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Jt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${ma.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: ma.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": o,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Hu = "_sidebar_s9o1j_3", Fu = "_brand_s9o1j_9", zu = "_mark_s9o1j_17", ju = "_word_s9o1j_24", Wu = "_nav_s9o1j_30", Ku = "_navItem_s9o1j_39", Gu = "_footLink_s9o1j_49", Uu = "_group_s9o1j_58", Vu = "_groupName_s9o1j_65", Yu = "_agents_s9o1j_81", Ju = "_agent_s9o1j_81", Qu = "_root_s9o1j_96", Xu = "_agentTop_s9o1j_105", Zu = "_dot_s9o1j_112", eh = "_agentName_s9o1j_124", th = "_agentMeta_s9o1j_138", nh = "_foot_s9o1j_49", ah = "_footName_s9o1j_150", rh = "_footLinks_s9o1j_157", lh = "_linkBrand_s9o1j_184", oh = "_label_s9o1j_205", ih = "_note_s9o1j_210", sh = "_footer_s9o1j_226", I = {
  sidebar: Hu,
  brand: Fu,
  mark: zu,
  word: ju,
  nav: Wu,
  navItem: Ku,
  new: "_new_s9o1j_48",
  footLink: Gu,
  group: Uu,
  groupName: Vu,
  agents: Yu,
  agent: Ju,
  root: Qu,
  agentTop: Xu,
  dot: Zu,
  agentName: eh,
  agentMeta: th,
  foot: nh,
  footName: ah,
  footLinks: rh,
  linkBrand: lh,
  label: oh,
  note: ih,
  footer: sh
};
function ch({ agent: e }) {
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
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function dh({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function uh({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: o }) {
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
      l && /* @__PURE__ */ n("a", { className: I.new, href: T(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(ch, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(dh, { shared: o })
  ] });
}
function hh(e) {
  return e.destinations ?? e.items ?? [];
}
function mh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function wh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function _h({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function fh(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(mh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: hh(e).map((t) => /* @__PURE__ */ n(_h, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(wh, { children: e.children })
  ] });
}
function vh(e) {
  return "agents" in e;
}
function VL(e) {
  return vh(e) ? /* @__PURE__ */ n(uh, { ...e }) : /* @__PURE__ */ n(fh, { ...e });
}
const bh = "_mark_wlgi8_3", gh = {
  mark: bh
}, ph = { met: "✓", unmet: "", failed: "✕" };
function On({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: gh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: ph[e]
    }
  );
}
const yh = "_avatar_1t33a_3", Nh = {
  avatar: yh
};
function Ft(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function kh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ft(e), ...[...t.slice(1)].map((r) => a + r)];
}
function $h(e, t) {
  const a = kh(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ft(e).charAt(0) + String(r)); ) r += 1;
  return Ft(e).charAt(0) + String(r);
}
function YL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = $h(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function Ch(e) {
  return e != null && yt(e) ? Jl(e) : void 0;
}
function JL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Nh.avatar, "data-size": a, "aria-hidden": "true", style: Ch(t), children: r ?? Ft(e) });
}
const Sh = "_marker_br9fi_2", Rh = {
  marker: Sh
}, xh = {
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
}, Th = { running: " ward-running" };
function Ke({ size: e, kind: t, label: a }) {
  const r = { "--marker": xh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Rh.marker} ward-marker ward-marker--${t}${Th[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Lh = "_root_ti0pq_2", Mh = "_chip_ti0pq_11", Ah = "_noCase_ti0pq_23", xt = {
  root: Lh,
  chip: Mh,
  noCase: Ah
};
function Ih(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Dn({ connection: e, since: t, lastEventAt: a }) {
  const r = Ih(t, a), l = Mn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${xt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ke, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${xt.chip} ward-connection`, role: "status", children: [
    "Reconnecting ·",
    " ",
    /* @__PURE__ */ n("span", { className: xt.noCase, children: Tn(l) })
  ] }) : /* @__PURE__ */ i("span", { className: `${xt.chip} ward-connection`, role: "status", children: [
    "Out of date · as of ",
    me(r)
  ] });
}
const Eh = "_root_19rl8_2", Bh = "_context_19rl8_13", Ph = "_row_19rl8_1", qh = "_heading_19rl8_27", Oh = "_headingWrap_19rl8_35", Dh = "_meta_19rl8_41", Hh = "_chips_19rl8_49", Fh = "_title_19rl8_56", zh = "_consequence_19rl8_66", jh = "_actionsWrap_19rl8_73", Wh = "_actions_19rl8_73", Kh = "_action_19rl8_73", Gh = "_overflowPanel_19rl8_102", Uh = "_measureClip_19rl8_113", Vh = "_measure_19rl8_113", G = {
  root: Eh,
  context: Bh,
  row: Ph,
  heading: qh,
  headingWrap: Oh,
  meta: Dh,
  chips: Hh,
  title: Fh,
  consequence: zh,
  actionsWrap: jh,
  actions: Wh,
  action: Kh,
  overflowPanel: Gh,
  measureClip: Uh,
  measure: Vh
};
function Yh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(st, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ n("h1", { className: G.title, children: e });
}
function Jh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: G.chips, children: e.map((t) => /* @__PURE__ */ n(w, { ...t }, t.label)) }) : null;
}
function Qh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: G.consequence, title: t, children: e }) : null;
}
function Xh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ n(Jh, { chips: e }),
    /* @__PURE__ */ n(Qh, { consequence: t, consequenceHint: a })
  ] });
}
function Zh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ n(Yh, { title: e, density: l }),
    /* @__PURE__ */ n(Xh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function gn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: G.action, "data-action": "", children: t }, a));
}
function wa({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function em({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(wa, { disclosure: l }) : t ? [/* @__PURE__ */ n(wa, { disclosure: l }, "more"), /* @__PURE__ */ n(gn, { actions: e }, "actions")] : /* @__PURE__ */ n(gn, { actions: e });
}
function tm(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function nm({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(gn, { actions: e }) });
}
function am(e, t) {
  const a = y(), [r, l] = v(!1), o = r && e;
  return { disclosure: { open: o, panelId: a, toggle: () => l(!o) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const rm = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function lm(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && rm(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function om({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: G.context, children: /* @__PURE__ */ n(_c, { path: e.path, current: e.current }) });
}
function im(...e) {
  return e.some((t) => t === null);
}
function sm(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function $r(e) {
  return getComputedStyle(e).flexDirection === "column";
}
function cm(e, t) {
  return $r(e) ? 0 : t.offsetWidth + sm(e);
}
function dm(e, t) {
  return !$r(e) && t.scrollWidth > t.clientWidth + 1;
}
function um(e, t, a, r, l) {
  if (l === 0 || im(t, a, r)) return !1;
  if (e.clientWidth === 0) return null;
  const [o, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - cm(e, o));
  return c.offsetWidth > d || dm(e, s);
}
function hm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function mm(e) {
  return Ll(e) && (e.type === "a" || typeof e.props.href == "string");
}
function wm(e, t) {
  return t.length === 0 && e.length === 1 && mm(e[0]);
}
function _m(e, t) {
  const a = f(null), r = f(null), l = f(null), o = f(null), [s, c] = v(!1);
  return S(() => {
    const d = a.current;
    if (!hm(d)) return;
    const u = () => {
      const m = um(d, r.current, l.current, o.current, e.length);
      m !== null && c(m);
    }, h = new ResizeObserver(u);
    return h.observe(d), o.current && h.observe(o.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: o, collapsed: s && !t };
}
function fm({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function vm({ connection: e }) {
  return e ? /* @__PURE__ */ n(Dn, { connection: e.connection, since: e.since }) : null;
}
function QL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: o, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: m, headingRef: _, actionsRef: N, measureRef: k, collapsed: M } = _m(s, wm(s, c)), O = c.length > 0, { disclosure: we, close: ae } = am(M || O, N), Ce = tm(c, s, M, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ n(om, { crumb: lm(e, r, t) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: _, className: G.headingWrap, children: /* @__PURE__ */ n(Zh, { title: r, chips: a, consequence: l, consequenceHint: o, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ n(vm, { connection: d }),
        /* @__PURE__ */ n("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(em, { actions: s, hasMore: O, collapsed: M, onOverflow: u, disclosure: we }) })
      ] })
    ] }),
    /* @__PURE__ */ n(nm, { actions: Ce, disclosure: we, onEscape: ae }),
    /* @__PURE__ */ n(fm, { actions: s, hasMore: O, measureRef: k })
  ] });
}
const bm = "_root_td96x_2", gm = "_body_td96x_16", _a = {
  root: bm,
  body: gm
};
function XL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${_a.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: _a.body, children: a }) });
}
const pm = "_tip_1bmx3_2", ym = "_bubble_1bmx3_1", fa = {
  tip: pm,
  bubble: ym
}, ht = 16;
function Nm(e, t, a) {
  return e < ht ? ht - e : t > a - ht ? Math.max(a - ht - t, ht - e) : 0;
}
function km(e) {
  const t = f(null), [a, r] = v(0);
  return Qe(() => {
    const l = t.current;
    if (!e || l === null) {
      r(0);
      return;
    }
    const o = l.getBoundingClientRect();
    r((s) => s + Nm(o.left, o.right, window.innerWidth));
  }, [e]), { bubble: t, style: { "--ward-tip-shift": `${a}px` } };
}
function ZL({ label: e, text: t, align: a = "center" }) {
  const r = y(), [l, o] = v(!1), s = km(l), c = (h) => {
    h.key !== "Escape" || !l || (h.stopPropagation(), o(!1));
  }, d = () => o(!0), u = () => o(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      className: `${fa.tip} ward-infotip`,
      "aria-label": `What ${e} counts`,
      "aria-describedby": r,
      "data-open": l ? "" : void 0,
      "data-align": a,
      onMouseEnter: d,
      onMouseLeave: u,
      onFocus: d,
      onBlur: u,
      onKeyDown: c,
      children: [
        /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ n("path", { d: "M12 11v5M12 8h.01" })
        ] }),
        /* @__PURE__ */ n("span", { className: fa.bubble, role: "tooltip", id: r, ref: s.bubble, style: s.style, children: t })
      ]
    }
  );
}
const $m = "_row_zzkv3_3", Cm = {
  row: $m
}, Hn = "custom", Sm = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: Hn, label: "Custom range" }
], Rm = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, xm = (e) => e.from !== "" && e.to !== "" && e.from > e.to, va = { from: "", to: "" }, Tm = (e, t) => t === null && "preset" in e ? e.preset : Hn;
function Lm({ range: e, today: t, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(E, { kind: "date", label: "From", value: e.from, max: e.to || t, onChange: a("from"), invalid: xm(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ n(E, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: t, onChange: a("to") })
  ] });
}
function e3({ value: e, onChange: t, today: a }) {
  const [r, l] = v("from" in e ? e : null), o = (c) => {
    if (c === Hn) return l(r ?? va);
    l(null), t({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? va, [c]: d };
    l(u), Rm(u) && t(u);
  };
  return /* @__PURE__ */ i("div", { className: `${Cm.row} ward-period`, children: [
    /* @__PURE__ */ n(E, { kind: "select", label: "Period", value: Tm(e, r), options: Sm, onChange: o }),
    r === null ? null : /* @__PURE__ */ n(Lm, { range: r, today: a, setEnd: s })
  ] });
}
const Mm = "_root_bf1pc_2", Am = "_table_bf1pc_9", Im = "_caption_bf1pc_14", Em = "_series_bf1pc_23", Bm = "_category_bf1pc_31", Pm = "_cell_bf1pc_39", qm = "_track_bf1pc_45", Om = "_lane_bf1pc_52", Dm = "_bar_bf1pc_56", Hm = "_value_bf1pc_63", Fm = "_swatch_bf1pc_70", zm = "_empty_bf1pc_78", Q = {
  root: Mm,
  table: Am,
  caption: Im,
  series: Em,
  category: Bm,
  cell: Pm,
  track: qm,
  lane: Om,
  bar: Dm,
  value: Hm,
  swatch: Fm,
  empty: zm
}, jm = "—", ba = 6;
function Wm(e, t) {
  if (t.length < 1 || t.length > ba)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${ba}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Km(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Cr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Gm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Um({ value: e, top: t, step: a, format: r, missing: l }) {
  const o = Gm(e, t), s = { "--share": `${o}%` };
  return /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ i("span", { className: Q.track, children: [
    /* @__PURE__ */ n("span", { className: Q.lane, children: o > 0 ? /* @__PURE__ */ n("span", { className: `${Q.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Q.value, children: e === null ? l : r(e) })
  ] }) });
}
function Vm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Q.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Q.swatch, "data-step": Cr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Ym({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Q.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Q.empty, children: t })
  ] });
}
function Jm({ title: e, categories: t, series: a, top: r, format: l = ne, categoryHead: o = "Category", missing: s = jm }) {
  return /* @__PURE__ */ n("div", { className: `${Q.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Q.table, children: [
    /* @__PURE__ */ n("caption", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Q.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ n(Vm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Q.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Um, { value: u.values[d], top: r, step: Cr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function t3(e) {
  Wm(e.categories, e.series);
  const t = Km(e.series);
  return t === 0 ? /* @__PURE__ */ n(Ym, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Jm, { ...e, top: t });
}
const Qm = "_root_1bfqw_2", Xm = "_figure_1bfqw_7", Zm = "_of_1bfqw_13", ew = "_bar_1bfqw_18", tw = "_rows_1bfqw_38", nw = "_row_1bfqw_38", aw = "_label_1bfqw_49", rw = "_amount_1bfqw_54", Oe = {
  root: Qm,
  figure: Xm,
  of: Zm,
  bar: ew,
  rows: tw,
  row: nw,
  label: aw,
  amount: rw
};
function lw({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${Oe.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${Oe.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ i("span", { className: Oe.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Oe.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Oe.rows, children: a.map((l) => /* @__PURE__ */ i("li", { className: `${Oe.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Oe.amount, children: le(l.amount) })
    ] }, l.label)) })
  ] });
}
const ow = "_frame_f7bxz_2", iw = "_table_f7bxz_6", sw = "_th_f7bxz_12", cw = "_td_f7bxz_13", dw = "_sort_f7bxz_53", uw = "_row_f7bxz_65", hw = "_empty_f7bxz_73", ze = {
  frame: ow,
  table: iw,
  th: sw,
  td: cw,
  sort: dw,
  row: uw,
  empty: hw
}, mw = { asc: "ascending", desc: "descending" };
function ww(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return mw[t.direction];
}
function _w(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: ze.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function fw(e) {
  return e === void 0 ? void 0 : { width: e };
}
function vw({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ze.th,
      style: fw(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ww(e, t),
      children: _w(e, a)
    }
  );
}
function bw({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: ze.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: ze.td,
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
function gw({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: l,
  selectedId: o,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: ze.empty, children: u }) : /* @__PURE__ */ n("div", { className: ze.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: ze.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ze.head, children: t.map((m) => /* @__PURE__ */ n(vw, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((m) => /* @__PURE__ */ n(bw, { row: m, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: o, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(m))) })
  ] }) });
}
const pw = "_list_v0s52_2", yw = {
  list: pw
};
function Nw({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: yw.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const kw = "_label_1u62a_2", $w = {
  label: kw
};
function n3({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: $w.label, children: t.header }) }, t.key)) }) });
}
const Cw = "_stack_bp6a0_2", Sw = {
  stack: Cw
};
function a3({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Sw.stack, "data-ward-action-stack": "", children: e });
}
const Rw = "_set_1z0sq_2", xw = "_legend_1z0sq_7", Tw = "_row_1z0sq_15", Lw = "_control_1z0sq_20", Mw = "_input_1z0sq_26", Aw = "_label_1z0sq_31", Iw = "_consequence_1z0sq_36", Ue = {
  set: Rw,
  legend: xw,
  row: Tw,
  control: Lw,
  input: Mw,
  label: Aw,
  consequence: Iw
};
function Sr({ legend: e, options: t, value: a, onChange: r, disabled: l, name: o, describedBy: s, variant: c }) {
  const d = y(), u = o ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ue.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ue.legend, children: e }),
    t.map((h) => {
      const m = `${u}-${h.value}`, _ = h.consequence ? `${m}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ue.row, children: [
        /* @__PURE__ */ i("span", { className: Ue.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: m,
              type: "radio",
              name: u,
              className: Ue.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": dt(_, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: m, className: Ue.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ue.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Ew = "_root_11gpw_2", Bw = "_head_11gpw_10", Pw = "_note_11gpw_29", qw = "_index_11gpw_34", Ow = "_dot_11gpw_38", Dw = "_counter_11gpw_49", Hw = "_trailing_11gpw_57", Ye = {
  root: Ew,
  head: Bw,
  note: Pw,
  index: qw,
  dot: Ow,
  counter: Dw,
  trailing: Hw
};
function Fw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ye.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ye.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function zw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ye.counter, "aria-hidden": "true", children: e }) : null;
}
function ga({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: o }) {
  return /* @__PURE__ */ i("div", { className: `${Ye.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ i("h2", { className: Ye.head, children: [
      /* @__PURE__ */ n(Fw, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ye.note, children: a }),
    /* @__PURE__ */ n(zw, { counter: r }),
    o === void 0 ? null : /* @__PURE__ */ n("span", { className: Ye.trailing, children: o })
  ] });
}
const jw = "_strip_c3x3u_2", Ww = "_cell_c3x3u_7", Kw = "_value_c3x3u_12", Gw = "_link_c3x3u_29", Uw = "_label_c3x3u_49", Vw = "_tiles_c3x3u_101", We = {
  strip: jw,
  cell: Ww,
  value: Kw,
  link: Gw,
  label: Uw,
  tiles: Vw
};
function Rr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const xr = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Yw({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: xr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function Jw({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: xr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${We.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Tr = (e) => e.href === void 0 ? /* @__PURE__ */ n(Yw, { cell: e }, e.label) : /* @__PURE__ */ n(Jw, { cell: e, href: e.href }, e.label);
function en({ cells: e, divided: t = !1 }) {
  return Rr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Tr) });
}
const pa = 6;
function r3({ cells: e }) {
  Rr("StatTiles", e, [1, 2 * pa]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, pa) };
  return /* @__PURE__ */ n("dl", { className: `${We.tiles} ward-stattiles`, style: t, children: e.map(Tr) });
}
const Qw = "_root_1eb1u_2", Xw = "_track_1eb1u_8", Zw = "_thumb_1eb1u_46", e_ = "_labelHidden_1eb1u_64", t_ = "_label_1eb1u_64", it = {
  root: Qw,
  track: Xw,
  thumb: Zw,
  labelHidden: e_,
  label: t_
};
function n_(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function a_(e) {
  return e ? `${it.label} ${it.labelHidden}` : it.label;
}
function r_(e, t, a) {
  return e && !t && a ? a : void 0;
}
function l_(e, t, a, r) {
  return { "aria-describedby": Xt(dt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function o_({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Xe({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: o, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, m = qe(), { on: _, off: N } = n_(t, r, l, m !== null), k = r_(N, m !== null, c);
  return /* @__PURE__ */ i("span", { className: `${it.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...l_(h, o, m, k),
        className: `${it.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: it.thumb })
      }
    ),
    /* @__PURE__ */ n("label", { id: d, htmlFor: u, className: a_(s), children: e }),
    /* @__PURE__ */ n(o_, { id: h, reason: k })
  ] });
}
const i_ = "_bar_1vp69_2", s_ = "_skip_1vp69_11", c_ = "_mark_1vp69_22", d_ = "_nav_1vp69_30", u_ = "_list_1vp69_34", h_ = "_select_1vp69_41", m_ = "_selectTrigger_1vp69_45", w_ = "_dest_1vp69_52", __ = "_actor_1vp69_71", f_ = "_actorMark_1vp69_84", v_ = "_actorLabel_1vp69_89", b_ = "_tagline_1vp69_108", ce = {
  bar: i_,
  skip: s_,
  mark: c_,
  nav: d_,
  list: u_,
  select: h_,
  selectTrigger: m_,
  dest: w_,
  actor: __,
  actorMark: f_,
  actorLabel: v_,
  tagline: b_
};
function g_(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function p_(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function l3({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: o, skipTo: s = "main" }) {
  const c = p_(r);
  return /* @__PURE__ */ i("header", { className: ce.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ce.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ce.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ce.tagline, children: l }),
    /* @__PURE__ */ i("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ce.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ce.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => o == null ? void 0 : o(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        dr,
        {
          className: ce.select,
          triggerClassName: ce.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => o == null ? void 0 : o(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: ce.actor, children: [
      /* @__PURE__ */ n("span", { className: ce.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: g_(c) })
    ] })
  ] });
}
const y_ = "_tree_zzoob_2", N_ = "_item_zzoob_6", k_ = "_row_zzoob_10", $_ = "_button_zzoob_22", zt = {
  tree: y_,
  item: N_,
  row: k_,
  button: $_
}, Lr = $e(null);
function C_({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Jt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Lr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: zt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const S_ = { ArrowRight: !0, ArrowLeft: !1 };
function ya(e) {
  return e ? !0 : void 0;
}
function R_(e, t) {
  const a = S_[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function x_(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function T_(e) {
  const t = [zt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function L_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function M_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function A_(e) {
  return typeof e == "string" ? e : void 0;
}
function I_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function E_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Mr(e) {
  const t = ge(Lr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = L_(e);
  return /* @__PURE__ */ i("li", { className: zt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: T_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": ya(e.unresolved),
        "data-inherited": ya(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${zt.button} ward-treeitem-btn`,
            onClick: () => x_(e),
            onKeyDown: (r) => R_(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: M_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: A_(e.label), children: e.label }),
              /* @__PURE__ */ n(I_, { value: e.detail }),
              /* @__PURE__ */ n(E_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const B_ = "_frame_gxspk_2", P_ = "_subjectRail_gxspk_22", q_ = "_subject_gxspk_22", O_ = "_rail_gxspk_42", D_ = "_record_gxspk_57", H_ = "_recordBody_gxspk_102", F_ = "_stageGrid_gxspk_157", z_ = "_band_gxspk_171", j_ = "_bandBody_gxspk_179", W_ = "_bandActions_gxspk_184", K_ = "_scroller_gxspk_192", G_ = "_board_gxspk_219", U_ = "_lanes_gxspk_228", V_ = "_cardGrid_gxspk_262", X = {
  frame: B_,
  subjectRail: P_,
  subject: q_,
  rail: O_,
  record: D_,
  recordBody: H_,
  stageGrid: F_,
  band: z_,
  bandBody: j_,
  bandActions: W_,
  scroller: K_,
  board: G_,
  lanes: U_,
  cardGrid: V_
};
function o3({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: X.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Na(e) {
  return e ? "true" : void 0;
}
function i3({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: o }) {
  return /* @__PURE__ */ i("div", { className: X.subjectRail, "data-ward-subject-rail": a, "data-ruled": Na(o), children: [
    /* @__PURE__ */ n("div", { className: X.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: X.rail, "data-sticky": Na(l), "aria-label": r, children: t })
  ] });
}
function s3({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: o, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: X.record, "aria-label": o, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ga, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: X.record, "aria-label": o, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ga, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const Y_ = "_form_1j8ub_2", J_ = "_fields_1j8ub_9", Q_ = "_actions_1j8ub_19", sn = {
  form: Y_,
  fields: J_,
  actions: Q_
};
function c3({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (o) => {
    o.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: sn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: sn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: sn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function d3({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: X.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: X.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: X.bandActions, children: t })
  ] });
}
const X_ = "(max-width: 767.98px)";
function Fn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(In, { className: X.scroller, label: e, count: a ?? ja.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Z_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = v(null), o = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(E, { kind: "select", label: a, value: (o == null ? void 0 : o.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Fn, { label: t, children: o == null ? void 0 : o.content })
  ] });
}
function ef({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ n(Fn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(za, { children: a.content }, a.id)) }) });
}
function u3({ children: e, label: t = "Board", lanes: a, laneLabel: r = "Column" }) {
  const l = gt(X_);
  return a === void 0 ? /* @__PURE__ */ n(Fn, { label: t, children: e }) : l ? /* @__PURE__ */ n(Z_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(ef, { lanes: a, label: t });
}
function h3({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), o = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(In, { className: X.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: o, children: t });
}
function m3({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${X.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const tf = "_block_6tv5x_3", nf = "_sentence_6tv5x_10", af = "_meta_6tv5x_19", rf = "_ways_6tv5x_24", lf = "_action_6tv5x_38", of = "_strip_6tv5x_42", sf = "_loading_6tv5x_61", cf = "_label_6tv5x_69", df = "_counter_6tv5x_76", be = {
  block: tf,
  sentence: nf,
  meta: af,
  ways: rf,
  action: lf,
  strip: of,
  loading: sf,
  label: cf,
  counter: df
};
function uf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: be.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function tn({ sentence: e, action: t, children: a, role: r = "status", tone: l, kind: o, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${be.block} ward-state${o === void 0 ? "" : ` ${o}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ i("p", { className: be.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(uf, { action: t })
  ] });
}
function hf(e) {
  return /* @__PURE__ */ n(tn, { ...e, kind: "ward-emptystate" });
}
function w3({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(tn, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function mf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${be.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function _3({ ways: e, ...t }) {
  return /* @__PURE__ */ n(tn, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(mf, { ways: e }) });
}
function f3({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(tn, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "failed at ",
    me(t)
  ] }) });
}
function v3({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(t)
  ] });
}
function b3({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(t)
  ] });
}
function g3({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = v(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), ye.load);
    return () => window.clearTimeout(s);
  }, []);
  const o = Mn(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: be.counter, children: Tn(o) }) : null
  ] });
}
const wf = "_note_cigdt_2", _f = {
  note: wf
};
function ff({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: _f.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const vf = "_card_k7btg_3", bf = "_hit_k7btg_31", gf = "_head_k7btg_44", pf = "_title_k7btg_51", yf = "_meta_k7btg_57", Nf = "_since_k7btg_66", kf = "_sep_k7btg_76", $f = "_fields_k7btg_80", Cf = "_field_k7btg_80", Sf = "_last_k7btg_98", Rf = "_reason_k7btg_110", he = {
  card: vf,
  hit: bf,
  head: gf,
  title: pf,
  meta: yf,
  since: Nf,
  sep: kf,
  fields: $f,
  field: Cf,
  last: Sf,
  reason: Rf
}, xf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Tf(e, t, a) {
  const r = Bt(e, "blue"), l = Bt(e, "orange"), o = Bt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: o };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = xf[d.type];
      u && c[u]();
    });
  }, [r, a, o, t, l]);
}
const Lf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Mf(e, t) {
  return Lf[t](e);
}
function Af({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: he.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function If({ item: e }) {
  const t = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ n(w, { role: "drift", label: "Off plan" }),
    t && /* @__PURE__ */ n(w, { role: t.role, label: t.label })
  ] });
}
function Ef({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Bf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: he.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: he.field, children: Mf(e, a) }, a)) });
}
const pn = (e) => e ? !0 : void 0;
function Pf(e) {
  return { "--stream": ke(e.streamStep, "id") };
}
function qf(e, t, a) {
  e == null || e(t, a);
}
function Of(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Df({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: he.last, "data-stale": pn(t), children: a }) : null;
}
function nn(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  Tf(r, a.key, e.feed);
  const l = Of(e.feed), o = Pf(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: he.card,
      style: o,
      "data-selected": pn(e.selected),
      "data-flagged": pn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: he.hit, onClick: (s) => qf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(If, { item: a }),
        /* @__PURE__ */ n(st, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ n(Af, { item: a, connection: l }),
        /* @__PURE__ */ n(Ef, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Bf, { item: a, fields: t }),
        /* @__PURE__ */ n(Df, { item: a, stale: l === "stale" })
      ]
    }
  );
}
function kt(e, t) {
  return e.trim().toLowerCase() === t.toLowerCase();
}
const Hf = "_column_1j8bi_3", Ff = "_head_1j8bi_21", zf = "_label_1j8bi_30", jf = "_count_1j8bi_39", Wf = "_list_1j8bi_53", vt = {
  column: Hf,
  head: Ff,
  label: zf,
  count: jf,
  list: Wf
};
function Ar(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Kf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: vt.head, children: [
    /* @__PURE__ */ n("h2", { className: vt.label, id: a, title: e.label, children: e.label }),
    e.gate && !kt(e.label, "Review") && /* @__PURE__ */ n(w, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: vt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Gf(e) {
  return /* @__PURE__ */ n("div", { className: vt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      nn,
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
function Uf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, m = Ar(t, r);
  return /* @__PURE__ */ i("section", { className: vt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Kf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Gf, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, rows: m }),
    h && /* @__PURE__ */ n(ff, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Vf = "_foot_cs4jr_2", Yf = "_note_cs4jr_13", Jf = "_link_cs4jr_19", cn = {
  foot: Vf,
  note: Yf,
  link: Jf
};
function p3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: cn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: cn.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${cn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const Qf = "_head_1tfi5_3", Xf = "_identity_1tfi5_12", Zf = "_titleRow_1tfi5_18", ev = "_title_1tfi5_18", tv = "_key_1tfi5_35", nv = "_rollup_1tfi5_45", av = "_tools_1tfi5_53", rv = "_swatch_1tfi5_101", lv = "_mark_1tfi5_108", Te = {
  head: Qf,
  identity: Xf,
  titleRow: Zf,
  title: ev,
  key: tv,
  rollup: nv,
  tools: av,
  swatch: rv,
  mark: lv
}, ka = "initials:";
function ov(e) {
  return e === void 0 ? "done this week unknown" : `${ne(e)} done this week`;
}
function iv(e) {
  const t = [ov(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ne(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${se(e.p90)}`), t.join(" · ");
}
function sv(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ne(e.inFlight),
      " open"
    ] }),
    " · ",
    iv(e)
  ] });
}
function cv(e) {
  return e.startsWith(ka) ? e.slice(ka.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function dv({ markRef: e, streamStep: t }) {
  const a = { "--stream": ke(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Te.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: cv(e) }) : /* @__PURE__ */ n("span", { className: Te.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function uv({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function y3({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: o,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: Te.head, children: [
    /* @__PURE__ */ i("div", { className: Te.identity, children: [
      /* @__PURE__ */ i("div", { className: Te.titleRow, children: [
        /* @__PURE__ */ n(dv, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Te.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Te.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Te.rollup, "aria-live": "polite", children: sv(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Te.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(uv, { owners: l, owner: o, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Dn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const hv = "_head_1sejb_14", mv = "_line_1sejb_15", wv = "_cHandle_1sejb_36", _v = "_cName_1sejb_41", fv = "_nameLine_1sejb_49", vv = "_cLabel_1sejb_56", bv = "_cCap_1sejb_61", gv = "_cShown_1sejb_66", pv = "_name_1sejb_49", yv = "_noCap_1sejb_88", Nv = "_state_1sejb_102", kv = "_handle_1sejb_111", H = {
  head: hv,
  line: mv,
  cHandle: wv,
  cName: _v,
  nameLine: fv,
  cLabel: vv,
  cCap: bv,
  cShown: gv,
  name: pv,
  noCap: yv,
  state: Nv,
  handle: kv
}, $v = "Review stages always show.", Cv = "Done stages are counted, not shown.";
function N3() {
  return /* @__PURE__ */ i("div", { className: H.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.cHandle }),
    /* @__PURE__ */ n("span", { className: H.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: H.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: H.cShown, children: "Shown" })
  ] });
}
function Sv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Rv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function xv({ stage: e }) {
  return /* @__PURE__ */ n("span", { className: H.cName, children: /* @__PURE__ */ i("span", { className: H.nameLine, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    e.gate && !kt(e.name, "Review") && /* @__PURE__ */ n(w, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function Tv(e) {
  return e === void 0 ? "" : String(e);
}
function Lv(e) {
  return e === "" ? void 0 : Number(e);
}
function Mv({ name: e, onReorder: t }) {
  const a = qe();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: H.cHandle }) : /* @__PURE__ */ n("span", { className: H.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: H.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && Rv(r, t),
      children: "⠿"
    }
  ) });
}
function Av({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${H.cCap} ${H.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: H.cCap, children: /* @__PURE__ */ n(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Tv(t.cap), onChange: (r) => a({ ...t, cap: Lv(r) }) }) });
}
function Iv(e) {
  return e.gate ? $v : e.terminal ? Cv : void 0;
}
function Ev({ stage: e, config: t, onChange: a }) {
  const r = qe() !== null, l = Sv(e, t.shown), o = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: H.cShown, children: [
    /* @__PURE__ */ n(Xe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: Iv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: H.state, "data-fixed": o || void 0, "aria-hidden": "true", onClick: () => !o && s(!l.shown), children: l.state })
  ] });
}
function Bv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function k3({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: H.line, "data-kind": Bv(e), children: [
    /* @__PURE__ */ n(Mv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(xv, { stage: e }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: /* @__PURE__ */ n(E, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(Av, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Ev, { stage: e, config: t, onChange: a })
  ] });
}
const Pv = "_body_8qsv9_2", qv = "_head_8qsv9_9", Ov = "_summary_8qsv9_19", Dv = "_block_8qsv9_20", Hv = "_actionsBlock_8qsv9_21", Fv = "_title_8qsv9_41", zv = "_note_8qsv9_46", jv = "_k_8qsv9_51", Wv = "_kv_8qsv9_58", Kv = "_row_8qsv9_64", Gv = "_label_8qsv9_75", Uv = "_value_8qsv9_84", Vv = "_quote_8qsv9_90", Yv = "_actions_8qsv9_21", Jv = "_resolve_8qsv9_111", j = {
  body: Pv,
  head: qv,
  summary: Ov,
  block: Dv,
  actionsBlock: Hv,
  title: Fv,
  note: zv,
  k: jv,
  kv: Wv,
  row: Kv,
  label: Gv,
  value: Uv,
  quote: Vv,
  actions: Yv,
  resolve: Jv
};
function Qv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Xv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Zv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function eb(e, t, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Qv(e),
    ...Zv(a),
    ...Xv(e, t)
  ];
}
function tb({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: j.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: j.k, children: t }),
    e
  ] });
}
function nb(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function ab({ item: e, showKey: t }) {
  const a = nb(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: j.head, children: [
    t && /* @__PURE__ */ n(w, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(w, { role: a.role, label: a.label })
  ] });
}
function rb({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: j.block, children: [
    /* @__PURE__ */ n("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function $3({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: o, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), m = eb(e, l, d);
  return /* @__PURE__ */ n(ut, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: j.body, children: [
    /* @__PURE__ */ n(ab, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: j.summary, children: [
      /* @__PURE__ */ n("h2", { className: j.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: j.kv, children: m.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: j.row, children: [
      /* @__PURE__ */ n("dt", { className: j.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: j.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(rb, { item: e }),
    /* @__PURE__ */ i("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: j.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ n(tb, { resolve: o, label: s ?? "Next steps" })
  ] }) });
}
const lb = "_root_3azmy_2", ob = "_list_3azmy_7", ib = "_item_3azmy_12", sb = "_box_3azmy_18", cb = "_text_3azmy_23", db = "_note_3azmy_28", et = {
  root: lb,
  list: ob,
  item: ib,
  box: sb,
  text: cb,
  note: db
};
function an({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: et.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${et.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: et.box, children: /* @__PURE__ */ n(On, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: et.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${et.note} ward-checklist-note`, children: t })
  ] });
}
const ub = "_rail_znbbp_2", hb = "_k_znbbp_11", mb = "_head_znbbp_19", wb = "_section_znbbp_25", _b = "_card_znbbp_39", fb = "_strip_znbbp_46", vb = "_skeleton_znbbp_60", bb = "_skeletonLabel_znbbp_74", gb = "_bar_znbbp_80", pb = "_note_znbbp_89", de = {
  rail: ub,
  k: hb,
  head: mb,
  section: wb,
  card: _b,
  strip: fb,
  skeleton: vb,
  skeletonLabel: bb,
  bar: gb,
  note: pb
};
function yb(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ir({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    t
  ] });
}
function Nb({ effects: e }) {
  const t = e.filter((a) => !a.met);
  return t.length === 0 ? null : /* @__PURE__ */ n(Ir, { title: "Warnings", children: /* @__PURE__ */ n(an, { items: t, density: "compact" }) });
}
function kb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function $b({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Uf, { column: l, items: t.filter((o) => o.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function Cb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n($b, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(kb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function C3(e) {
  const t = yb(e.onOpen), a = Ar(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ n("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: a && /* @__PURE__ */ n(nn, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Ir, { title: "Columns", children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Cb, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Nb, { effects: e.effects })
  ] });
}
function Sb(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Rb(e) {
  return Math.ceil(e.length / 2);
}
function xb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Er(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Tb(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = Er(e);
  l !== void 0 && a(l), r(xb(e.type));
}
function Lb(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (o) => Tb(o, a, r, l));
  }, [e, t, a, r, l]);
}
function Mb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Ab(e, t) {
  return t ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Ib(e, t) {
  return t !== void 0 ? se(e.timeInStage) + " · waits on " + t.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Eb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + P.height.card + " + " + P.height.cardRow + " * " + String(Rb(t ?? [])) + ")"
  };
}
function Bb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Pb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(w, { role: "meta", label: le(e.cost) }) : null;
}
function qb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(w, { role: "meta", label: e.jiraKey }) : null;
}
function Ob(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Db(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Hb(e, t) {
  return t === void 0 ? e : Sb(e, t.ref);
}
function Fb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function pt(e) {
  return e === !0 ? "true" : void 0;
}
function Br(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), o = Bt(l), s = f(/* @__PURE__ */ new Set()), [c, d] = v(Mb(t));
  Lb(e.feed, t.key, s, d, o);
  const u = Ab(t, r), h = Ib(t, a), m = Eb(t, e.fields), _ = Db(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Fb(e),
      className: "ward-workcard",
      "data-flagged": pt(t.flagged),
      "data-selected": pt(e.selected),
      style: m,
      ref: Hb(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Bb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(w, { role: u.role, label: u.label }),
          Pb(t, e.fields),
          qb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          Ob(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function zb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function jb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Wb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(w, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ n(w, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Kb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(zb, { count: e.items.length, cap: e.column.cap });
}
function Gb(e, t) {
  return e.roving ?? t;
}
function Ub(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Vb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Br,
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
function Yb(e) {
  const t = y(), a = Jt({ orientation: "vertical" }), r = Gb(e, a), l = jb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": pt(l), "data-gate": pt(e.column.gate), children: [
    Wb(e.column, e.items.length, t),
    Kb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Ub(e, a), children: Vb(e, r) })
  ] });
}
function Jb(e) {
  let t = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (t += " · p50 " + se(e.p50)), e.p90 !== void 0 && (t += " · p90 " + se(e.p90)), t;
}
function Qb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Xb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function S3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(w, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(w, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Jb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Qb(e),
      Xb(e.onConfigure),
      /* @__PURE__ */ n(Dn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Zb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function eg(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function tg(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(w, { role: "running", label: String(t) + (t === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(w, { role: "soft", label: "Done" }) : null
  ] });
}
function R3(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": pt(Zb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: eg(e) }),
    /* @__PURE__ */ n(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(nr, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    tg(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function x3(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Br, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Yb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function ng(e, t) {
  const a = Er(e);
  a !== void 0 && t(a);
}
function ag(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => ng(r, a));
  }, [e, t, a]);
}
function rg(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function lg(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function og(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function ig(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(w, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function T3(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = v((s = t.run) == null ? void 0 : s.lastStep);
  ag(e.feed, t.key, l);
  const o = [...rg(t), ...lg(t)];
  return /* @__PURE__ */ i(ut, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      o.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      og(a, r)
    ] }),
    ig(t, e.actions)
  ] });
}
const sg = "_card_1nkkx_3", cg = "_head_1nkkx_30", dg = "_mark_1nkkx_38", ug = "_name_1nkkx_50", hg = "_chips_1nkkx_71", mg = "_description_1nkkx_77", wg = "_run_1nkkx_82", _g = "_sep_1nkkx_91", fg = "_facts_1nkkx_97", vg = "_fact_1nkkx_97", bg = "_factLabel_1nkkx_111", gg = "_factValue_1nkkx_115", ie = {
  card: sg,
  head: cg,
  mark: dg,
  name: ug,
  chips: hg,
  description: mg,
  run: wg,
  sep: _g,
  facts: fg,
  fact: vg,
  factLabel: bg,
  factValue: gg
}, pg = { live: "done", draft: "running", paused: "meta" };
function yg(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Ng({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(w, { role: pg[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function kg({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function $g({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Cg({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Sg(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Rg({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: o, className: s }) {
  const c = { "--stream": ke(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: yg(s),
      style: c,
      "data-selected": d,
      "data-paused": Sg(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          e.streamStep === null ? null : /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(kg, { description: e.description }),
        /* @__PURE__ */ n($g, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Ng, { versions: e.versions }),
        /* @__PURE__ */ n(Cg, { facts: o })
      ]
    }
  );
}
const xg = "_list_4dcyc_2", Tg = "_row_4dcyc_11", Lg = "_head_4dcyc_23", Mg = "_id_4dcyc_30", Ag = "_lock_4dcyc_35", Ig = "_reason_4dcyc_41", Eg = "_remove_4dcyc_46", Bg = "_clauses_4dcyc_50", Pg = "_clause_4dcyc_50", qg = "_label_4dcyc_64", Og = "_cell_4dcyc_71", Dg = "_value_4dcyc_76", ue = {
  list: xg,
  row: Tg,
  head: Lg,
  id: Mg,
  lock: Ag,
  reason: Ig,
  remove: Eg,
  clauses: Bg,
  clause: Pg,
  label: qg,
  cell: Og,
  value: Dg
}, Pr = $e(!1);
function L3({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Pr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ue.list, "aria-label": t, children: e }) });
}
function Hg({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(E, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function Fg({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ n(w, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ue.reason, children: e })
  ] });
}
function zg({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ n("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Fg, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function $a(e, t) {
  return e.locked ? void 0 : t;
}
function M3({ rule: e, onChange: t, onRemove: a }) {
  if (!ge(Pr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = $a(e, t);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(zg, { rule: e, onRemove: $a(e, a) }),
    /* @__PURE__ */ n("dl", { className: ue.clauses, children: e.clauses.map((l) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ n("dt", { className: ue.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ue.cell, children: /* @__PURE__ */ n(Hg, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const jg = "_ladder_1xdeh_2", Wg = "_cell_1xdeh_7", Kg = "_empty_1xdeh_26", Gg = "_name_1xdeh_34", Ug = "_holder_1xdeh_40", Vg = "_swatches_1xdeh_51", Yg = "_swatch_1xdeh_51", Jg = "_tilesFrame_1xdeh_78", Qg = "_tiles_1xdeh_78", Xg = "_tile_1xdeh_78", Zg = "_bar_1xdeh_117", ep = "_hex_1xdeh_128", tp = "_note_1xdeh_138", oe = {
  ladder: jg,
  cell: Wg,
  empty: Kg,
  name: Gg,
  holder: Ug,
  swatches: Vg,
  swatch: Yg,
  tilesFrame: Jg,
  tiles: Qg,
  tile: Xg,
  bar: Zg,
  hex: ep,
  note: tp
}, A3 = "Not available yet";
function np(e) {
  return e.reserved ? "reserved" : yt(e.step) ? "validated" : "partial";
}
function qr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function ap(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function rp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${oe.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function lp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function op(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ca = (e) => String(e).padStart(2, "0");
function ip(e, t, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : t ?? qr(e, void 0);
}
function sp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${oe.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${oe.hex} ward-ladder-hex`, children: r ? `step ${Ca(e)}` : Xl(e) }),
    /* @__PURE__ */ n("span", { className: `${oe.note} ward-ladder-note`, children: r ? a : `Step ${Ca(e)} · ${a}` })
  ] });
}
function cp({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: o }) {
  const s = np(e), c = qr(s, a), d = c !== "free", u = d || o, h = t === e.step, m = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${m} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...op(d, h, u), "data-validation": s, style: ap(e, s), onClick: _, onKeyDown: (M) => lp(M, _) }, label: N, name: m, holder: c, validation: s, note: ip(s, a, h), step: e.step };
}
const dp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${oe.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${oe.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(sp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${oe.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(rp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${oe.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${oe.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function up(e) {
  return dp[e.presentation](cp(e));
}
function hp(e) {
  for (const t of e)
    if (!t.reserved && !Qt(t.step)) throw new Error("colour ladder renders token steps only");
}
function mp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const wp = { list: oe.ladder, swatches: oe.swatches, tiles: oe.tilesFrame };
function _p(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Or(e) {
  const t = e.takenBy ?? {}, a = (o) => {
    var s;
    (s = e.onChange) == null || s.call(e, o);
  };
  hp(e.steps);
  const r = mp(e), l = e.steps.map((o) => /* @__PURE__ */ n(up, { step: o, value: e.value, taken: t[o.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, o.step));
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ..._p(e.disabled === !0), className: `${wp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: oe.tiles, children: l }) : l });
}
const fp = "_rail_s06lm_2", vp = "_section_s06lm_12", bp = "_sectionFlush_s06lm_22", gp = "_head_s06lm_26", pp = "_headLabel_s06lm_34", yp = "_sample_s06lm_42", Np = "_sampleLabel_s06lm_47", kp = "_sampleTitle_s06lm_54", $p = "_sampleMeta_s06lm_59", Cp = "_trace_s06lm_65", Sp = "_traceHead_s06lm_70", Rp = "_steps_s06lm_78", xp = "_step_s06lm_78", Tp = "_stepTitle_s06lm_97", Lp = "_hollow_s06lm_107", Mp = "_stepBody_s06lm_115", Ap = "_stepDetail_s06lm_127", Ip = "_publish_s06lm_132", Ep = "_reason_s06lm_138", Bp = "_note_s06lm_143", Pp = "_reveal_s06lm_148", C = {
  rail: fp,
  section: vp,
  sectionFlush: bp,
  head: gp,
  headLabel: pp,
  sample: yp,
  sampleLabel: Np,
  sampleTitle: kp,
  sampleMeta: $p,
  trace: Cp,
  traceHead: Sp,
  steps: Rp,
  step: xp,
  stepTitle: Tp,
  hollow: Lp,
  stepBody: Mp,
  stepDetail: Ap,
  publish: Ip,
  reason: Ep,
  note: Bp,
  reveal: Pp
}, Sa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, qp = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, Op = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Dp = { notSimulated: "not simulated", running: "running" };
function Hp(e) {
  return e.presentation === "foundry";
}
function Fp(e, t) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = t.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function zp(e, t) {
  var r;
  const a = qp[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function jp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Wp(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Kp(e) {
  if (jp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Gp(e) {
  const [t, a] = v(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${C.step} ${C.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Up(e) {
  const t = Dp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: C.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Ke, { size: 6, kind: Op[e.kind], label: e.kind });
}
function Vp(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: C.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Yp(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Jp(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Gp, { kind: t.kind, children: [
    /* @__PURE__ */ n(Up, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: C.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: C.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Vp, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Yp, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Qp(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(se(t)), a.join(" · ");
}
function Dr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${C.trace} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.traceHead, id: t, children: Qp(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: C.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Jp, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Xp(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${C.sample} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ i("p", { className: C.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ i("p", { className: C.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Zp(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${C.sampleMeta} ${C.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + t + ". Nothing saved." });
}
function ey(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ka(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function ty(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Ka(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function ny(e) {
  const t = ty(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: C.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function Hr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${C.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function ay(e) {
  return /* @__PURE__ */ i("div", { className: `${C.publish} ${C.section}`, children: [
    /* @__PURE__ */ n(Hr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: C.note, children: e.note })
  ] });
}
function ry(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${C.publish} ${C.section}`, children: /* @__PURE__ */ n(Hr, { reason: e.reason, onPublish: e.onPublish }) });
}
function Fr(e) {
  return /* @__PURE__ */ i("div", { className: `${C.head} ${C.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: C.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(w, { role: Sa[e.run.status].role, label: Sa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function ly(e, t) {
  const [a, r] = v(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((o) => {
          var s, c;
          return [...o, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function oy(e) {
  var a;
  Wp(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Fr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Xp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Dr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(ey, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(an, { items: e.checklist }) }),
    /* @__PURE__ */ n(ay, { reason: Fp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function iy(e) {
  var r;
  const t = ly(e.run, e.feed);
  Kp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Fr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Zp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Dr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(ny, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(an, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(ry, { reason: zp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function I3(e) {
  return Hp(e) ? /* @__PURE__ */ n(iy, { ...e }) : /* @__PURE__ */ n(oy, { ...e });
}
const sy = "_list_142ip_3", cy = "_row_142ip_9", dy = "_condition_142ip_18", uy = "_action_142ip_24", qt = {
  list: sy,
  row: cy,
  condition: dy,
  action: uy
}, zr = $e(!1);
function E3({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(zr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: qt.list, "aria-label": t, children: e }) });
}
function B3({ rule: e }) {
  if (!ge(zr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: qt.row, children: [
    /* @__PURE__ */ n(w, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: qt.condition, children: e.when }),
    /* @__PURE__ */ n(w, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: qt.action, children: e.then })
  ] });
}
const hy = "_move_tmppt_3", my = {
  move: hy
};
function yn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function jr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Wr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Ra(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function wy(e) {
  return e === "up" ? "down" : "up";
}
function _y(e, t) {
  const a = Ra(e, t.id, t.direction) ?? Ra(e, t.id, wy(t.direction));
  a == null || a.focus();
}
function Kr() {
  const e = f(null), [t, a] = v(null), [r, l] = v("");
  return S(() => {
    e.current !== null && t !== null && _y(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Gr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function jt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${my.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const fy = "_body_1jd1i_2", vy = "_title_1jd1i_8", by = "_section_1jd1i_13", gy = "_legend_1jd1i_18", py = "_stages_1jd1i_26", yy = "_stage_1jd1i_26", Ny = "_stageIndex_1jd1i_44", ky = "_stageName_1jd1i_50", $y = "_footer_1jd1i_59", Cy = "_note_1jd1i_66", Sy = "_reason_1jd1i_71", Ry = "_actions_1jd1i_76", xy = "_webHead_1jd1i_83", Ty = "_kicker_1jd1i_92", Ly = "_webTitle_1jd1i_99", My = "_webBody_1jd1i_105", Ay = "_webSection_1jd1i_109", Iy = "_sectionHead_1jd1i_121", Ey = "_sectionNote_1jd1i_129", By = "_formLabel_1jd1i_134", Py = "_identityRow_1jd1i_139", qy = "_nameCell_1jd1i_145", Oy = "_keyCell_1jd1i_150", Dy = "_colourCell_1jd1i_154", Hy = "_colourStatus_1jd1i_161", Fy = "_webStages_1jd1i_166", zy = "_webStageList_1jd1i_172", jy = "_webStage_1jd1i_166", Wy = "_webIndex_1jd1i_191", Ky = "_webStageName_1jd1i_196", Gy = "_webMoves_1jd1i_201", Uy = "_addStage_1jd1i_215", Vy = "_addStageButton_1jd1i_223", Yy = "_webFooter_1jd1i_236", Jy = "_webFooterNotes_1jd1i_244", Qy = "_webNote_1jd1i_251", g = {
  body: fy,
  title: vy,
  section: by,
  legend: gy,
  stages: py,
  stage: yy,
  stageIndex: Ny,
  stageName: ky,
  footer: $y,
  note: Cy,
  reason: Sy,
  actions: Ry,
  webHead: xy,
  kicker: Ty,
  webTitle: Ly,
  webBody: My,
  webSection: Ay,
  sectionHead: Iy,
  sectionNote: Ey,
  formLabel: By,
  identityRow: Py,
  nameCell: qy,
  keyCell: Oy,
  colourCell: Dy,
  colourStatus: Hy,
  webStages: Fy,
  webStageList: zy,
  webStage: jy,
  webIndex: Wy,
  webStageName: Ky,
  webMoves: Gy,
  addStage: Uy,
  addStageButton: Vy,
  webFooter: Yy,
  webFooterNotes: Jy,
  webNote: Qy
}, Xy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent" },
  { value: "gate", label: "review" },
  { value: "terminal", label: "done" }
], Ur = "not a known stage";
function Zy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Ur}` }, ...a];
}
function eN({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const o = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Ur}`;
  return /* @__PURE__ */ n(E, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Zy(a, e.name), invalid: o, onChange: r });
}
function Vr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function tN(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function nN({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: o, onMove: s }) {
  const c = Vr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${g.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: g.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: g.webStageName, children: /* @__PURE__ */ n(eN, { stage: t, index: a, catalogue: l, onName: (u) => o({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(E, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Xy, onChange: (u) => o({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: g.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(jt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(jt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function aN({ stages: e, onChange: t, catalogue: a }) {
  const r = tN(e.length), l = Kr(), o = (c, d) => {
    const u = jr(c, d);
    r.current = yn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Wr(Vr(e[c], c), u, e.length)), t(yn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: g.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: g.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(nN, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => o(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Gr, { text: l.announcement }),
    /* @__PURE__ */ n("p", { className: g.addStage, children: /* @__PURE__ */ n("button", { type: "button", className: g.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const rN = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function lN({ stage: e }) {
  return e.gate && !kt(e.name, "Review") ? /* @__PURE__ */ n(w, { role: "gate", label: "Review" }) : null;
}
const oN = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." }
], Yr = "Nothing runs until you publish.", iN = "Add a name and a key.", sN = "At least 2 stages";
function zn(e, t) {
  return !e.reserved && yt(e.step) && t[e.step] === void 0;
}
function cN(e, t) {
  const a = e.find((r) => zn(r, t));
  return a ? a.step : 1;
}
function dN({ stages: e, onMove: t }) {
  const a = Kr(), r = (l, o) => {
    const s = jr(l, o);
    a.moved({ id: e[l].id, direction: o }, Wr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: g.stages, "aria-label": "Stages in order", children: e.map((l, o) => /* @__PURE__ */ i("li", { className: g.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: g.stageIndex, children: String(o + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: g.stageName, children: l.name }),
      /* @__PURE__ */ n(lN, { stage: l }),
      o > 0 && /* @__PURE__ */ n(jt, { id: l.id, name: l.name, direction: "up", onMove: () => r(o, "up") }),
      o < e.length - 1 && /* @__PURE__ */ n(jt, { id: l.id, name: l.name, direction: "down", onMove: () => r(o, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Gr, { text: a.announcement })
  ] });
}
function uN({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: g.footer, children: [
    /* @__PURE__ */ n("p", { className: g.note, children: Yr }),
    e && /* @__PURE__ */ n("p", { className: g.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: g.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function hN(e, t) {
  return e !== "" && t !== "" ? null : iN;
}
function mN(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = oN, onCreate: o, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, m] = v(""), [_, N] = v(""), [k, M] = v(t[0].value), [O, we] = v(() => cN(a, r)), [ae, Ce] = v(e.stages ?? rN), [Ze, A] = v(l[0].value), V = { name: h, key: _, streamStep: O, owner: k, stages: ae, policy: Ze }, Se = hN(h, _);
  return /* @__PURE__ */ n(ut, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: g.body, children: [
    /* @__PURE__ */ n("h2", { className: g.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: g.section, children: [
      /* @__PURE__ */ n("legend", { className: g.legend, children: "Identity" }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Name", value: h, onChange: m }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: k, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: g.section, children: [
      /* @__PURE__ */ n("legend", { className: g.legend, children: "Colour" }),
      /* @__PURE__ */ n(Or, { label: "Colour", steps: a, value: O, onChange: we, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: g.section, children: [
      /* @__PURE__ */ n("legend", { className: g.legend, children: "Stages" }),
      /* @__PURE__ */ n(dN, { stages: ae, onMove: (Ge, Tl) => Ce(yn(ae, Ge, Tl)) })
    ] }),
    /* @__PURE__ */ n(Sr, { legend: "When items move on", options: l, value: Ze, onChange: A }),
    /* @__PURE__ */ n(uN, { reason: Se, onCreate: () => o(V), onDraft: () => s(V) })
  ] }) });
}
const Jr = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
], wN = "Add a name, key, owner and two stages.";
function _N(e, t, a, r, l, o) {
  var c;
  const s = ((c = Jr.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: o };
}
function fN(e, t) {
  return vN(e) && bN(e, t) && gN(e);
}
function vN(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function bN(e, t) {
  return e.colourStep === null || zn({ step: e.colourStep }, t);
}
function gN(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function pN(e, t) {
  if (e === null || zn({ step: e }, t)) return "";
  const a = t[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function yN({ ready: e, draft: t, onCreate: a, onDraft: r, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: g.webFooter, children: [
    /* @__PURE__ */ i("div", { className: g.webFooterNotes, children: [
      /* @__PURE__ */ n("p", { className: g.webNote, children: Yr }),
      !e && /* @__PURE__ */ n("p", { id: l, className: g.reason, children: wN })
    ] }),
    r && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => r(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => a(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function NN({ titleId: e }) {
  return /* @__PURE__ */ n("header", { className: g.webHead, children: /* @__PURE__ */ n("h2", { id: e, className: g.webTitle, children: "New stream" }) });
}
function kN({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: o }) {
  return /* @__PURE__ */ i("section", { className: g.webSection, children: [
    /* @__PURE__ */ n("h3", { className: g.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: g.identityRow, children: [
      /* @__PURE__ */ n("div", { className: g.nameCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: g.keyCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    o
  ] });
}
function $N(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, o] = v(""), [s, c] = v(""), [d, u] = v(e.owners[0] ?? ""), [h, m] = v(null), [_, N] = v("relay"), [k, M] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), O = _N(l, s, d, h, _, k), we = fN(O, r), ae = /* @__PURE__ */ i("div", { className: g.colourCell, children: [
    /* @__PURE__ */ n("span", { className: g.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Or, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: m, takenBy: r })
  ] }), Ce = pN(h, r), Ze = /* @__PURE__ */ i(x, { children: [
    Ce && /* @__PURE__ */ n("p", { className: g.colourStatus, "data-colour-status": "", children: Ce }),
    /* @__PURE__ */ n(E, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((A) => ({ value: A, label: A })), onChange: u })
  ] });
  return /* @__PURE__ */ i(ut, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(NN, { titleId: a }),
    /* @__PURE__ */ i("div", { className: g.webBody, children: [
      /* @__PURE__ */ n(kN, { name: l, setName: o, streamKey: s, setKey: c, colour: ae, owner: Ze }),
      e.fields && /* @__PURE__ */ n("section", { className: g.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: g.webSection, children: [
        /* @__PURE__ */ i("div", { className: g.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: g.kicker, children: "Stages" }),
          /* @__PURE__ */ n("span", { className: g.sectionNote, children: sN })
        ] }),
        /* @__PURE__ */ n(aN, { stages: k, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: g.webSection, children: /* @__PURE__ */ n(Sr, { variant: "cards", legend: "How agents write", value: _, options: Jr, onChange: N }) }),
      /* @__PURE__ */ n(yN, { ready: we, draft: O, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function P3(e) {
  return "presentation" in e ? /* @__PURE__ */ n($N, { ...e }) : /* @__PURE__ */ n(mN, { ...e });
}
const CN = "_row_bs8hc_2", SN = "_cell_bs8hc_6", RN = "_condition_bs8hc_11", xN = "_action_bs8hc_18", TN = "_contract_bs8hc_24", LN = "_contractCondition_bs8hc_33", MN = "_contractAction_bs8hc_39", ee = {
  row: CN,
  cell: SN,
  condition: RN,
  action: xN,
  contract: TN,
  contractCondition: LN,
  contractAction: MN
}, Qr = ["advance", "block", "escalate", "requestReview"], xa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Wt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function jn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ee.action, children: xa[e.then] }) : /* @__PURE__ */ n(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Qr.map((l) => ({ value: l, label: xa[l] }))
    }
  );
}
function AN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(w, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Wt(e, r), children: Wt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(w, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: jn(e, t, a) })
  ] });
}
function IN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(w, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Wt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: jn(e, t, a) })
  ] });
}
function EN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(w, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Wt(e, r) }),
    /* @__PURE__ */ n(w, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: jn(e, t, a, !0) })
  ] });
}
const BN = { two: IN, four: AN, contract: EN };
function q3(e) {
  var a;
  if (!Qr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = BN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const PN = "_column_g1uat_2", qN = "_head_g1uat_17", ON = "_index_g1uat_23", DN = "_name_g1uat_29", HN = "_meta_g1uat_38", FN = "_mono_g1uat_43", zN = "_gate_g1uat_50", jN = "_reviewersLabel_g1uat_57", WN = "_reviewers_g1uat_57", KN = "_reviewer_g1uat_57", GN = "_agents_g1uat_74", UN = "_workflowColumn_g1uat_79", VN = "_workflowHead_g1uat_96", YN = "_stageRow_g1uat_102", JN = "_stageLabel_g1uat_109", QN = "_workflowTitle_g1uat_116", XN = "_workflowMeta_g1uat_122", ZN = "_workflowGate_g1uat_127", e1 = "_gateNote_g1uat_135", t1 = "_cardNote_g1uat_140", n1 = "_reviewerList_g1uat_145", a1 = "_reviewerRow_g1uat_151", r1 = "_reviewerMark_g1uat_157", l1 = "_reviewerName_g1uat_167", o1 = "_terminalCard_g1uat_173", i1 = "_terminalCount_g1uat_182", s1 = "_workflowAgents_g1uat_188", c1 = "_mount_g1uat_194", R = {
  column: PN,
  head: qN,
  index: ON,
  name: DN,
  meta: HN,
  mono: FN,
  gate: zN,
  reviewersLabel: jN,
  reviewers: WN,
  reviewer: KN,
  agents: GN,
  workflowColumn: UN,
  workflowHead: VN,
  stageRow: YN,
  stageLabel: JN,
  workflowTitle: QN,
  workflowMeta: XN,
  workflowGate: ZN,
  gateNote: e1,
  cardNote: t1,
  reviewerList: n1,
  reviewerRow: a1,
  reviewerMark: r1,
  reviewerName: l1,
  terminalCard: o1,
  terminalCount: i1,
  workflowAgents: s1,
  mount: c1
}, Ta = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function Wn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Xr(e) {
  return `${Math.round(e * 100)}%`;
}
function d1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(en, { cells: [
      { value: Xr(e.gateShare), label: "Held for review" },
      { value: ne(e.count), label: "In stage" }
    ] })
  ] });
}
function u1({ stage: e }) {
  return /* @__PURE__ */ n(en, { cells: [
    { value: ne(e.count), label: "In stage" },
    { value: Wn(e.closedThisWeek, ne), label: "Closed this week" }
  ] });
}
function h1({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    kt(e.name, Ta[e.kind]) ? null : /* @__PURE__ */ n(w, { role: e.kind === "gate" ? "gate" : "soft", label: Ta[e.kind] })
  ] });
}
function m1({ stage: e }) {
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
function w1({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(d1, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(u1, { stage: e }) : null;
}
function _1({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function f1({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), o = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(h1, { stage: e, titleId: l }),
    /* @__PURE__ */ n(m1, { stage: e }),
    /* @__PURE__ */ n(w1, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Rg, { ...s, connection: o }, s.agent.id)) }),
    /* @__PURE__ */ n(_1, { onMount: a })
  ] });
}
const v1 = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function b1({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function g1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.gateNote, children: t.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    t.length === 0 ? null : /* @__PURE__ */ n(b1, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Xr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function p1(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function y1({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Wn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: p1(e.rolledBackThisWeek) })
  ] });
}
function N1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function k1(e) {
  if (e.kind === "terminal") return `${Wn(e.closedThisWeek)} this week`;
  const t = N1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function $1({ stage: e, titleId: t }) {
  const a = v1[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || kt(e.name, a.label) ? null : /* @__PURE__ */ n(w, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: k1(e) })
  ] });
}
function C1(e) {
  return e === "entry" || e === "agent";
}
function S1({ stage: e, onMount: t }) {
  return t === void 0 || !C1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Add agent" });
}
function R1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n($1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(g1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(y1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(S1, { stage: e, onMount: a })
  ] });
}
function x1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function O3(e) {
  return x1(e) ? /* @__PURE__ */ n(R1, { ...e }) : /* @__PURE__ */ n(f1, { ...e });
}
const T1 = "_row_1tdra_6", L1 = "_name_1tdra_12", M1 = "_compactRow_1tdra_13", A1 = "_compactName_1tdra_13", I1 = "_cell_1tdra_30", E1 = "_chain_1tdra_45", B1 = "_owner_1tdra_51", P1 = "_mono_1tdra_57", q1 = "_compactCell_1tdra_79", O1 = "_stack_1tdra_96", D1 = "_stat_1tdra_103", H1 = "_identityLine_1tdra_110", F1 = "_identity_1tdra_110", z1 = "_ownerLine_1tdra_140", j1 = "_link_1tdra_160", W1 = "_gateMark_1tdra_166", K1 = "_emptyChain_1tdra_171", G1 = "_arrow_1tdra_177", U1 = "_muted_1tdra_182", V1 = "_define_1tdra_187", Y1 = "_statValue_1tdra_194", J1 = "_policyId_1tdra_200", Q1 = "_sub_1tdra_205", p = {
  row: T1,
  name: L1,
  compactRow: M1,
  compactName: A1,
  cell: I1,
  chain: E1,
  owner: B1,
  mono: P1,
  compactCell: q1,
  stack: O1,
  stat: D1,
  identityLine: H1,
  identity: F1,
  ownerLine: z1,
  link: j1,
  gateMark: W1,
  emptyChain: K1,
  arrow: G1,
  muted: U1,
  define: V1,
  statValue: Y1,
  policyId: J1,
  sub: Q1
};
function Zr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function X1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function Z1(e) {
  return e === void 0 ? p.compactRow : `${p.compactRow} ${e}`;
}
function el(e) {
  return `${ne(e)} ${e === 1 ? "member" : "members"}`;
}
function ek(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${el(e.members)}`;
}
function tk(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: /* @__PURE__ */ i("span", { className: p.stack, children: [
    /* @__PURE__ */ i("span", { className: p.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${p.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${p.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(w, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: p.ownerLine, children: ek(e) })
  ] }) });
}
function tl({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: p.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(w, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function nk(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = Zt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function ak({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${p.chain} ward-chiprow`, children: e.map((l, o) => /* @__PURE__ */ i("span", { className: p.link, children: [
    /* @__PURE__ */ n(tl, { name: l.name, gate: l.gate === !0, look: nk(o, a, t), size: "tag" }),
    o === r ? null : /* @__PURE__ */ n("span", { className: p.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${o}`)) });
}
function rk(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: p.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: p.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: p.define, children: "Define workflow" })
  ] }) : ak(e) });
}
function nl(e) {
  return e === void 0 ? void 0 : !0;
}
function La(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: a }) : /* @__PURE__ */ i("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: `${p.statValue} ward-stat-value`, title: r, "data-raised": nl(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: p.sub, children: t })
  ] }) });
}
function lk(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: p.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: p.sub, children: e.summary })
  ] }) });
}
function ok(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function ik({ stream: e, href: t, presentation: a }) {
  const r = Z1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Zr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ke(e.streamStep, "chip") }, children: [
    tk(e, t),
    rk(e),
    La(ok(e.agents), e.agents === void 0 ? void 0 : X1(e.agents), "—"),
    lk(e.policy),
    La(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function sk(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function D3(e) {
  if (sk(e)) return ik(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: p.row, onClick: Zr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: p.cell, children: [
      /* @__PURE__ */ n("a", { className: `${p.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(w, { ...En(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(w, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ n("span", { className: p.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: p.link, children: /* @__PURE__ */ n(tl, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ i("span", { className: p.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ i("td", { className: p.cell, children: [
      /* @__PURE__ */ n("span", { className: p.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: p.mono, children: el(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, title: t.inFlightHint, "data-raised": nl(t.inFlightHint), children: ne(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, children: t.p50 === void 0 ? "" : se(t.p50) }) })
  ] });
}
const ck = "_row_2u4ll_2", dk = "_name_2u4ll_16", uk = "_scope_2u4ll_24", Kt = {
  row: ck,
  name: dk,
  scope: uk
};
function Kn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function hk(e) {
  return e === void 0 ? `${Kt.row} ward-toolrow` : `${Kt.row} ward-toolrow ${e}`;
}
function mk(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "Locked by stream policy" };
}
function wk({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (o) => {
        r.locked || l(o.target.checked);
      }
    }
  );
}
function _k({ classification: e }) {
  return /* @__PURE__ */ n(w, { role: e === "write" ? "write" : "meta", label: Kn(e) });
}
function fk({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Kt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function vk(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function H3({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), o = mk(e, a), s = vk(a);
  return /* @__PURE__ */ i(s, { className: hk(a == null ? void 0 : a.className), "data-locked": o.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(wk, { id: r, reasonId: l, tool: e, state: o, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Kt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(fk, { tool: e, state: o, reasonId: l }),
    /* @__PURE__ */ n(_k, { classification: e.classification }),
    o.locked ? /* @__PURE__ */ n(w, { role: "meta", label: "Locked" }) : null
  ] });
}
const bk = "_strip_4ppv9_2", gk = "_well_4ppv9_11", pk = "_head_4ppv9_18", yk = "_name_4ppv9_24", Nk = "_chart_4ppv9_32", kk = "_segment_4ppv9_38", $k = "_detailedChart_4ppv9_44", Ck = "_rail_4ppv9_57", Sk = "_section_4ppv9_63", Rk = "_label_4ppv9_74", xk = "_note_4ppv9_91", te = {
  strip: bk,
  well: gk,
  head: pk,
  name: yk,
  chart: Nk,
  segment: kk,
  detailedChart: $k,
  rail: Ck,
  section: Sk,
  label: Rk,
  note: xk
}, Tk = "Nothing to preview.", Nn = [1, 2, 3, 4, 5, 6], Gt = 100;
function Lk(e, t) {
  return t.has(e) ? ke(e, "id") : "var(--ward-color-line)";
}
function Mk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: te.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Nn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: te.segment,
      x: l * Gt,
      y: "0",
      width: Gt,
      height: "8",
      fill: Lk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ak(e) {
  const t = e.slice(0, Nn.length);
  for (; t.length < Nn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function Ik({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${te.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Gt),
        y: "0",
        width: String(Gt),
        height: "40",
        style: { fill: ke(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function al(e) {
  return (t) => e == null ? void 0 : e(t);
}
function dn({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: te.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: te.label, children: e }),
    t
  ] });
}
function Ek({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: te.note, children: t ?? Tk }) : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(nn, { item: { ...e, streamStep: Zt(a.streamStep) }, onOpen: al(r), feed: null }) });
}
function Bk({ draft: e }) {
  const t = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: te.head, style: t, children: [
    /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
    /* @__PURE__ */ n(w, { ...En(e.key, e.streamStep) })
  ] });
}
function Pk(e) {
  const t = Ak(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: te.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(dn, { label: "Board card", children: /* @__PURE__ */ n(Ek, { ...e, draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Streams index row", children: /* @__PURE__ */ n(Bk, { draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Overview chart segment", children: /* @__PURE__ */ n(Ik, { identities: t }) })
  ] });
}
function qk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: te.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ i("div", { className: te.head, children: [
      /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
      /* @__PURE__ */ n(w, { ...En(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(nn, { item: { ...t, streamStep: e.streamStep }, onOpen: al(r) }) }),
    /* @__PURE__ */ n(Mk, { draft: e, streams: a })
  ] });
}
function F3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Pk, { ...e }) : /* @__PURE__ */ n(qk, { ...e });
}
const Ok = "_row_ixlg5_6", Dk = "_headCell_ixlg5_10", Hk = "_cell_ixlg5_11", Fk = "_name_ixlg5_23", zk = "_consequence_ixlg5_29", jk = "_governed_ixlg5_36", Wk = "_control_ixlg5_42", Kk = "_byRole_ixlg5_48", Gk = "_webControl_ixlg5_59", Uk = "_webConsequence_ixlg5_65", Vk = "_webGoverned_ixlg5_71", z = {
  row: Ok,
  headCell: Dk,
  cell: Hk,
  name: Fk,
  consequence: zk,
  governed: jk,
  control: Wk,
  byRole: Kk,
  webControl: Gk,
  webConsequence: Uk,
  webGoverned: Vk
};
function Yk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: z.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: z.control, children: [
    /* @__PURE__ */ n(
      Xe,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(w, { role: "running", label: "Pilot" })
  ] });
}
function Jk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: z.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: z.headCell, children: [
      /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: z.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: z.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Yk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Qk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Xk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${z.webControl} ${z.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Xe,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (l) => a == null ? void 0 : a(t.streamStep, l ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${z.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(w, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Zk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: z.row, children: [
    /* @__PURE__ */ i("td", { className: z.cell, children: [
      /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${z.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Xk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webGoverned} ward-cellmeta`, children: Qk(e) }) })
  ] });
}
function z3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zk, { ...e }) : /* @__PURE__ */ n(Jk, { ...e });
}
const e$ = "_row_vv64h_2", t$ = "_cell_vv64h_6", n$ = "_name_vv64h_25", a$ = "_note_vv64h_30", r$ = "_webName_vv64h_41", l$ = "_webMeta_vv64h_47", J = {
  row: e$,
  cell: t$,
  name: n$,
  note: a$,
  webName: r$,
  webMeta: l$
}, rl = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function o$(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function i$({ component: e, onRestart: t }) {
  const a = y(), r = rl[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: J.cell, "data-mono": "true", children: [
      ne(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(w, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { id: a, className: J.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: J.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function s$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: o$(e.state) });
}
function c$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(w, { ...rl[e.state] }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(s$, { component: e, onRestart: t }) })
  ] });
}
function j3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(c$, { ...e }) : /* @__PURE__ */ n(i$, { ...e });
}
const d$ = "_row_jcm5k_7", u$ = "_cell_jcm5k_11", h$ = "_next_jcm5k_28", m$ = "_headCell_jcm5k_38", w$ = "_webId_jcm5k_77", _$ = "_webPurpose_jcm5k_83", f$ = "_webMeta_jcm5k_91", v$ = "_webUrgent_jcm5k_97", W = {
  row: d$,
  cell: u$,
  next: h$,
  headCell: m$,
  webId: w$,
  webPurpose: _$,
  webMeta: f$,
  webUrgent: v$
}, b$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, g$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, ll = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], p$ = Object.fromEntries(ll.map((e) => [e.key, e]));
function tt({ column: e, children: t }) {
  const a = p$[e];
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
function W3() {
  return /* @__PURE__ */ n("tr", { children: ll.map((e) => /* @__PURE__ */ n(
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
function y$({ cred: e }) {
  const t = b$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n(tt, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(tt, { column: "id", children: e.id }),
    /* @__PURE__ */ n(tt, { column: "state", children: /* @__PURE__ */ n(w, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(tt, { column: "cls", children: /* @__PURE__ */ n(w, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) }) }),
    /* @__PURE__ */ n(tt, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(tt, { column: "next", children: /* @__PURE__ */ n("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function N$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function k$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(w, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(N$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(w, { ...g$[e.state] }) })
  ] });
}
function K3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(k$, { ...e }) : /* @__PURE__ */ n(y$, { ...e });
}
const $$ = "_card_lpp45_2", C$ = "_head_lpp45_11", S$ = "_env_lpp45_18", R$ = "_version_lpp45_25", x$ = "_meta_lpp45_32", T$ = "_webCard_lpp45_37", L$ = "_webRow_lpp45_47", M$ = "_webTitle_lpp45_55", A$ = "_webLine_lpp45_65", I$ = "_webVersion_lpp45_72", E$ = "_webMeta_lpp45_77", Y = {
  card: $$,
  head: C$,
  env: S$,
  version: R$,
  meta: x$,
  webCard: T$,
  webRow: L$,
  webTitle: M$,
  webLine: A$,
  webVersion: I$,
  webMeta: E$
}, Ma = { dev: "Dev", uat: "UAT", prod: "Prod" }, ol = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function B$({ env: e }) {
  const t = ol[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: Y.card, "aria-label": Ma[e.env], children: [
    /* @__PURE__ */ i("div", { className: Y.head, children: [
      /* @__PURE__ */ n("span", { className: Y.env, children: Ma[e.env] }),
      /* @__PURE__ */ n(w, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Y.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: Y.meta, children: [
      "deployed ",
      me(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Y.meta, children: a })
  ] });
}
function P$(e) {
  const t = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function q$(e) {
  return /* @__PURE__ */ i("article", { className: `${Y.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${Y.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Y.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(w, { ...ol[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Y.version} ${Y.webVersion} ${Y.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Y.meta} ${Y.webMeta} ${Y.webLine} ward-cellmeta`, children: P$(e) })
  ] });
}
function G3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(q$, { ...e }) : /* @__PURE__ */ n(B$, { ...e });
}
const O$ = "_panel_1hmja_2", D$ = "_line_1hmja_8", H$ = "_actions_1hmja_14", Tt = {
  panel: O$,
  line: D$,
  actions: H$
};
function U3(e) {
  return /* @__PURE__ */ i("div", { className: Tt.panel, children: [
    /* @__PURE__ */ n("p", { className: Tt.line, children: e.status }),
    /* @__PURE__ */ n(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Tt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Tt.line, children: e.note ?? "" })
  ] });
}
const F$ = "_upload_13fcl_2", z$ = "_preview_13fcl_7", j$ = "_mark_13fcl_17", W$ = "_empty_13fcl_22", K$ = "_actions_13fcl_28", G$ = "_input_13fcl_33", U$ = "_reasons_13fcl_41", V$ = "_reason_13fcl_41", Y$ = "_accepted_13fcl_57", re = {
  upload: F$,
  preview: z$,
  mark: j$,
  empty: W$,
  actions: K$,
  input: G$,
  reasons: U$,
  reason: V$,
  accepted: Y$
}, il = 1.5, sl = 22, Ut = "script elements or event handlers", He = "links or external references", Ie = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${il}px at ${sl}px`], J$ = [Ie[1], Ie[2], Ut, He], Q$ = /* @__PURE__ */ new Map([
  ["image", Ie[1]],
  ["text", Ie[2]],
  ["tspan", Ie[2]],
  ["textPath", Ie[2]],
  ["script", Ut],
  ["foreignObject", Ut],
  ["a", He],
  ["use", He],
  ["style", He],
  ["feImage", He],
  ["set", He]
]), X$ = "http://www.w3.org/2000/svg", Z$ = "http://www.w3.org/2000/xmlns/", e0 = /* @__PURE__ */ new Set([
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
]), t0 = /* @__PURE__ */ new Set([
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
]), Gn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, n0 = /url\s*\(|['"\\]/i;
function a0() {
  return { ok: !1, reasons: [Ie[1]] };
}
function cl(e) {
  return e.namespaceURI === X$;
}
function r0(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && cl(t) ? t : null;
  } catch {
    return null;
  }
}
function l0(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ie[0]] : [];
}
function o0(e) {
  return Q$.get(e.localName) ?? (e.localName.startsWith("animate") ? He : void 0);
}
function i0(e) {
  return n0.test(e.replace(Gn, ""));
}
function s0(e) {
  return /^on/i.test(e.localName) ? Ut : e.localName === "href" || i0(e.value) ? He : void 0;
}
function c0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(o0(a));
    for (const r of Array.from(a.attributes)) t.add(s0(r));
  }
  return J$.filter((a) => t.has(a));
}
function d0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? sl / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const o = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(o) && o * r < il;
  }) ? [Ie[3]] : [];
}
function u0(e) {
  if (e.namespaceURI === Z$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (t0.has(t) || t.startsWith("stroke"));
}
function h0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && cl(t) && e0.has(t.localName);
}
function m0(e, t) {
  h0(t) ? t.nodeType === Node.ELEMENT_NODE && dl(t) : e.removeChild(t);
}
function dl(e) {
  for (const t of Array.from(e.attributes)) u0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) m0(e, t);
  return e;
}
function w0(e) {
  return Array.from(e.matchAll(Gn), (t) => t[2]).filter((t) => t !== "");
}
function _0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function f0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const o of w0(l.value)) a.has(o) || a.set(o, `${t}-${a.size}`);
  return a;
}
function v0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Gn, (r, l, o) => {
      const s = t.get(o);
      return s === void 0 ? r : r.replace(`#${o}`, `#${s}`);
    });
}
function b0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = f0(a, t);
  for (const l of a) {
    const o = r.get(l.getAttribute("id") ?? "");
    o === void 0 ? l.removeAttribute("id") : l.setAttribute("id", o), v0(l, r);
  }
  return e;
}
function V3(e) {
  const t = r0(e);
  if (t === null) return a0();
  const a = [...l0(t), ...c0(t), ...d0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(b0(dl(t), _0(e))) };
}
const g0 = "Mark accepted.", p0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, y0 = new Set(Ua.flatMap((e) => [ke(e, "id"), ke(e, "chip")]));
function N0(e) {
  return e !== void 0 && (p0.test(e) || y0.has(e)) ? e : void 0;
}
function k0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: re.preview, style: { "--mark": N0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: re.empty }) });
}
function $0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function C0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function S0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("p", { className: re.accepted, children: g0 }) }) : /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: re.reason, children: t }, t)) }) });
}
function R0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(S0, { result: e }) : /* @__PURE__ */ n("p", { className: `${re.result} ${$0(e, a)}`, role: "status", children: C0(e, a) });
}
function Aa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function Y3({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const o = f(null), [s, c] = v(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ n(k0, { current: e }),
    /* @__PURE__ */ i("div", { className: re.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: re.input,
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
      /* @__PURE__ */ n(b, { ...Aa(l), onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...Aa(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(R0, { result: s, presentation: r })
  ] });
}
const x0 = "_row_o3t6y_7", T0 = "_cell_o3t6y_11", L0 = "_head_o3t6y_28", M0 = "_name_o3t6y_34", A0 = "_pinned_o3t6y_42", I0 = "_headCell_o3t6y_49", E0 = "_webName_o3t6y_88", B0 = "_webMeta_o3t6y_95", P0 = "_webWarn_o3t6y_103", D = {
  row: x0,
  cell: T0,
  head: L0,
  name: M0,
  pinned: A0,
  headCell: I0,
  webName: E0,
  webMeta: B0,
  webWarn: P0
}, Un = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, ul = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], q0 = Object.fromEntries(ul.map((e) => [e.key, e]));
function O0(e, t) {
  return `mcp.${e}.${t}`;
}
function D0(e) {
  return Object.keys(Un).includes(e);
}
function H0(e) {
  return Un[e !== void 0 && D0(e) ? e : "unknown"];
}
function mt({ column: e, children: t }) {
  const a = q0[e];
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
function J3() {
  return /* @__PURE__ */ n("tr", { children: ul.map((e) => /* @__PURE__ */ n(
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
function F0({ server: e }) {
  const t = Un[e.connection];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i(mt, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(w, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(mt, { column: "connection", children: /* @__PURE__ */ n(w, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(mt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(mt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(mt, { column: "tools", children: e.tools.map((a) => O0(e.name, a)).join(" · ") })
  ] });
}
function z0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function j0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function W0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function K0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function G0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function U0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: z0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: l.map((o) => o.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(w, { ...j0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(W0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(w, { ...H0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n(K0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(G0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function Q3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(U0, { ...e }) : /* @__PURE__ */ n(F0, { ...e });
}
const V0 = "_row_zgozg_2", Y0 = "_headCell_zgozg_14", J0 = "_cell_zgozg_15", Q0 = "_name_zgozg_26", X0 = "_consequence_zgozg_32", Z0 = "_reason_zgozg_38", eC = "_value_zgozg_44", tC = "_webRow_zgozg_69", nC = "_webSetting_zgozg_82", aC = "_webName_zgozg_90", rC = "_webConsequence_zgozg_98", lC = "_webControl_zgozg_104", oC = "_webState_zgozg_118", iC = "_webChip_zgozg_123", q = {
  row: V0,
  headCell: Y0,
  cell: J0,
  name: Q0,
  consequence: X0,
  reason: Z0,
  value: eC,
  webRow: tC,
  webSetting: nC,
  webName: aC,
  webConsequence: rC,
  webControl: lC,
  webState: oC,
  webChip: iC
}, hl = 104, ml = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function sC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Xe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(kr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: q.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function cC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), o = ml[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: q.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: q.headCell, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: q.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: q.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(sC, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: q.cell, style: { width: hl }, children: /* @__PURE__ */ n(w, { role: o.role, label: o.label }) })
  ] });
}
function wl(e, t) {
  return String(e ?? t);
}
function dC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function uC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? wl(e.value, "—");
}
function hC({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const o = e.value === !0;
  return /* @__PURE__ */ i("span", { className: q.webControl, children: [
    /* @__PURE__ */ n(Xe, { label: t, labelHidden: !0, checked: o, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: q.webState, "aria-hidden": "true", children: a || o ? "on" : "off" })
  ] });
}
function mC(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(hC, { ...e });
  const l = dC(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: q.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(kr, { options: l, value: wl(t.value, ""), onChange: (o) => r == null ? void 0 : r(o) }) }) : /* @__PURE__ */ n("span", { className: `${q.webControl} ${q.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: uC(t) });
}
function wC({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: o }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${q.row} ${q.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: q.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${q.name} ${q.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${q.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    o ? /* @__PURE__ */ n("span", { className: q.webControl, children: o(s) }) : /* @__PURE__ */ n(mC, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${q.webChip} ward-policy-chip`, style: { width: hl }, children: /* @__PURE__ */ n(w, { ...ml[a], size: "tag" }) })
  ] });
}
function X3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wC, { ...e }) : /* @__PURE__ */ n(cC, { ...e });
}
const _C = "_label_1fzq1_7", fC = "_name_1fzq1_15", vC = "_column_1fzq1_24", bC = "_webFrame_1fzq1_57", gC = "_webHead_1fzq1_62", pC = "_webHeadLabel_1fzq1_74", yC = "_webLabel_1fzq1_118", NC = "_webColumns_1fzq1_125", kC = "_webGroup_1fzq1_131", $C = "_webPeople_1fzq1_132", CC = "_webVia_1fzq1_133", SC = "_webMeta_1fzq1_162", K = {
  label: _C,
  name: fC,
  column: vC,
  webFrame: bC,
  webHead: gC,
  webHeadLabel: pC,
  webLabel: yC,
  webColumns: NC,
  webGroup: kC,
  webPeople: $C,
  webVia: CC,
  webMeta: SC
}, RC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, un = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function hn({ column: e, children: t }) {
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
function xC(e) {
  if (!e.matrixRole) return;
  const t = RC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function TC({ node: e }) {
  const t = xC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(LC, { role: t, node: e }),
    /* @__PURE__ */ n(hn, { column: un[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(hn, { column: un[1], children: e.people === void 0 ? "" : ne(e.people) }),
    /* @__PURE__ */ n(hn, { column: un[2], children: e.requestedVia ?? "" })
  ] });
}
function LC({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(w, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(w, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(w, { role: "warn", label: "Unresolved" })
  ] });
}
function MC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: o, children: s }) {
  return /* @__PURE__ */ n(
    Mr,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: o,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(TC, { node: a }),
      children: s
    }
  );
}
function mn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function AC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(mn, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function IC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ n("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function EC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(w, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(w, { role: "meta", label: "default" }) : null
  ] });
}
function BC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function PC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(IC, {}),
    /* @__PURE__ */ n(C_, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Mr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(EC, { row: a }),
        detail: /* @__PURE__ */ n(AC, { row: a }),
        expanded: BC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function Z3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(PC, { ...e }) : /* @__PURE__ */ n(MC, { ...e });
}
const qC = "_runbook_b9agc_2", OC = "_list_b9agc_7", DC = "_step_b9agc_15", HC = "_numeral_b9agc_21", FC = "_body_b9agc_28", zC = "_head_b9agc_34", jC = "_title_b9agc_40", WC = "_detail_b9agc_45", KC = "_actions_b9agc_50", GC = "_webList_b9agc_56", UC = "_webStep_b9agc_60", VC = "_webBody_b9agc_66", YC = "_webTitle_b9agc_74", JC = "_webDetail_b9agc_78", B = {
  runbook: qC,
  list: OC,
  step: DC,
  numeral: HC,
  body: FC,
  head: zC,
  title: jC,
  detail: WC,
  actions: KC,
  webList: GC,
  webStep: UC,
  webBody: VC,
  webTitle: YC,
  webDetail: JC
}, _l = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function fl(e) {
  return String(e + 1).padStart(2, "0");
}
function QC({ step: e, index: t, connection: a }) {
  const r = _l[e.state], l = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: B.numeral, children: fl(t) }),
    /* @__PURE__ */ i("span", { className: B.body, children: [
      /* @__PURE__ */ i("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
        /* @__PURE__ */ n(w, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: B.detail, children: e.detail })
    ] })
  ] });
}
function XC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: B.list, children: e.map((r, l) => /* @__PURE__ */ n(QC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: B.actions, children: t })
  ] });
}
function ZC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: fl(t) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(w, { ..._l[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function eS({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(ZC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${B.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function e4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eS, { ...e }) : /* @__PURE__ */ n(XC, { ...e });
}
const tS = "_list_1gu6a_2", nS = "_check_1gu6a_10", aS = "_body_1gu6a_16", rS = "_text_1gu6a_23", lS = "_pending_1gu6a_32", oS = "_measured_1gu6a_37", rt = {
  list: tS,
  check: nS,
  body: aS,
  text: rS,
  pending: lS,
  measured: oS
};
function iS(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function sS({ check: e }) {
  const t = iS(e.passed);
  return /* @__PURE__ */ i("li", { className: `${rt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(On, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: rt.body, children: [
      /* @__PURE__ */ n("span", { className: rt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: rt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: rt.measured, children: e.measured })
  ] });
}
function t4({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${rt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(sS, { check: t }, t.text)) });
}
const cS = "_root_y6bbq_2", dS = "_list_y6bbq_10", uS = "_line_y6bbq_32", hS = "_at_y6bbq_59", mS = "_text_y6bbq_63", wS = "_foot_y6bbq_67", _S = "_idle_y6bbq_79", fS = "_caret_y6bbq_87", vS = "_jump_y6bbq_94", pe = {
  root: cS,
  list: dS,
  line: uS,
  at: hS,
  text: mS,
  foot: wS,
  idle: _S,
  caret: fS,
  jump: vS
}, bS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function kn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : bS.format(new Date(e));
}
const gS = { warn: "warning", ok: "ok" };
function pS({ kind: e }) {
  const t = gS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function yS({ connection: e, idleSince: t, last: a }) {
  return e === "stale" ? /* @__PURE__ */ n("span", { className: pe.idle, children: `Quiet since ${kn([t, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ n("span", { children: `Last event ${kn(a.at)}` });
}
function NS({ connection: e, idleSince: t, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n(yS, { connection: e, idleSince: t, last: a }),
    r
  ] });
}
const kS = 8;
function $S(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > kS;
}
function CS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const vl = $e(null);
function n4({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = v(!1), o = Fa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(vl.Provider, { value: o, children: a });
}
function SS() {
  const e = ge(vl), [t, a] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const RS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function a4({ lines: e, connection: t, idleSince: a, label: r = "Activity", fixed: l }) {
  const o = f(null), [s, c] = v(0), [d, u] = SS(), [h, m] = v(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), Qe(() => {
    const k = o.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var O;
    const k = o.current;
    if (!k) return;
    const M = k.querySelectorAll("[data-consline-text]");
    (O = M.item(M.length - 1)) == null || O.focus(), m(!1);
  };
  return /* @__PURE__ */ i("div", { className: pe.root, children: [
    /* @__PURE__ */ n("ol", { className: pe.list, ref: o, "aria-live": d ? "polite" : "off", "aria-label": r, ...RS(e.length, l), onScroll: (k) => m($S(k.currentTarget)), children: e.map((k, M) => /* @__PURE__ */ i("li", { className: `${pe.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": M < s, children: [
      /* @__PURE__ */ n("span", { className: pe.at, children: kn(k.at) }),
      /* @__PURE__ */ n(pS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${M}`)) }),
    /* @__PURE__ */ i(NS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(CS, { shown: h, onJump: N })
    ] })
  ] });
}
const xS = "_row_1k8wl_2", TS = "_head_1k8wl_14", LS = "_author_1k8wl_20", MS = "_eta_1k8wl_25", AS = "_edited_1k8wl_26", IS = "_body_1k8wl_32", ES = "_reason_1k8wl_37", BS = "_actions_1k8wl_42", xe = {
  row: xS,
  head: TS,
  author: LS,
  eta: MS,
  edited: AS,
  body: IS,
  reason: ES,
  actions: BS
}, PS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function qS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function OS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: o }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: o, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function DS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: xe.reason, id: t, children: e })
  ] });
}
function HS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function FS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(OS, { ...e }) : /* @__PURE__ */ n(DS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function r4(e) {
  const { comment: t } = e;
  HS(e);
  const a = y(), r = `${a}-unavailable`, l = PS[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${xe.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: xe.head, children: [
      /* @__PURE__ */ n("span", { className: xe.author, children: t.author }),
      /* @__PURE__ */ n(w, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: xe.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: xe.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: xe.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: xe.reason, id: a, children: qS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: xe.actions, children: /* @__PURE__ */ n(FS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const zS = "_root_lxbd7_2", jS = "_attach_lxbd7_11", WS = "_actions_lxbd7_17", KS = "_reply_lxbd7_23", GS = "_replyField_lxbd7_28", US = "_send_lxbd7_54", VS = "_sendIcon_lxbd7_65", Je = {
  root: zS,
  attach: jS,
  actions: WS,
  reply: KS,
  replyField: GS,
  send: US,
  sendIcon: VS
};
function bl({ value: e, onChange: t }) {
  const [a, r] = v("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function YS() {
  return /* @__PURE__ */ n("svg", { className: Je.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function JS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function QS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, o] = bl(e), s = () => {
    l.trim() !== "" && r(a, l);
  }, c = (d) => {
    JS(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ n("div", { className: Je.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Je.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ n(E, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: o }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Je.send, onClick: s, children: [
      /* @__PURE__ */ n(YS, {}),
      /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function l4(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(QS, { ...e }) : /* @__PURE__ */ n(XS, { ...e });
}
function XS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: o, onDraft: s } = e, [c, d] = bl(e);
  return /* @__PURE__ */ i("div", { className: Je.root, children: [
    /* @__PURE__ */ n(E, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Je.attach, children: [
      /* @__PURE__ */ n(w, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      nr,
      {
        label: `Run ${l.agent} again after you post`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Je.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const ZS = "_list_1yhks_2", e2 = "_item_1yhks_6", t2 = "_body_1yhks_22", n2 = "_text_1yhks_28", a2 = "_evidence_1yhks_37", r2 = "_consequence_1yhks_49", ot = {
  list: ZS,
  item: e2,
  body: t2,
  text: n2,
  evidence: a2,
  consequence: r2
};
function l2({ criterion: e }) {
  return /* @__PURE__ */ n(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ia({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function o2({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: ot.body, children: [
    /* @__PURE__ */ n("span", { className: ot.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ia, { text: " · " }),
      /* @__PURE__ */ n("code", { className: ot.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ia, { text: " · " }),
      /* @__PURE__ */ n("span", { className: ot.consequence, children: e.why })
    ] })
  ] });
}
function i2({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: ot.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(l2, { criterion: e }),
    /* @__PURE__ */ n(o2, { criterion: e })
  ] });
}
function o4({ criteria: e }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("ul", { className: `${ot.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(i2, { criterion: t }, t.text)) }) });
}
const s2 = "_list_dwhoz_2", c2 = "_rung_dwhoz_6", d2 = "_name_dwhoz_18", u2 = "_actor_dwhoz_32", Ot = {
  list: s2,
  rung: c2,
  name: d2,
  actor: u2
}, h2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function m2({ rung: e }) {
  const t = h2[e.state];
  return /* @__PURE__ */ i("li", { className: Ot.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Ot.name, children: e.name }),
    /* @__PURE__ */ n(w, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Ot.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function i4({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ot.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(m2, { rung: t }, t.name)) });
}
const w2 = "_sheet_pw37w_2", _2 = "_title_pw37w_9", f2 = "_stage_pw37w_15", v2 = "_effects_pw37w_20", b2 = "_effect_pw37w_20", g2 = "_numeral_pw37w_31", p2 = "_effectText_pw37w_38", y2 = "_refusals_pw37w_43", N2 = "_reasons_pw37w_52", k2 = "_reason_pw37w_52", $2 = "_actions_pw37w_62", _e = {
  sheet: w2,
  title: _2,
  stage: f2,
  effects: v2,
  effect: b2,
  numeral: g2,
  effectText: p2,
  refusals: y2,
  reasons: N2,
  reason: k2,
  actions: $2
};
function C2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function s4({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: o, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = v(""), m = a.length > 0;
  return /* @__PURE__ */ n(ut, { kind: "sheet", labelledBy: c, onClose: o, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: _e.sheet, children: [
    /* @__PURE__ */ i("h2", { className: _e.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: _e.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: _e.effects, children: t.map((_, N) => /* @__PURE__ */ i("li", { className: _e.effect, children: [
      /* @__PURE__ */ n("span", { className: _e.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: _e.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ n(
      lw,
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
    m && /* @__PURE__ */ i("div", { className: _e.refusals, children: [
      /* @__PURE__ */ n(w, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: _e.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: _e.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: _e.actions, children: [
      /* @__PURE__ */ n(C2, { refused: m, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: o, children: "Cancel" })
    ] })
  ] }) });
}
const S2 = "_list_1laeg_2", R2 = "_path_1laeg_7", x2 = "_consequence_1laeg_35", $n = {
  list: S2,
  path: R2,
  consequence: x2
}, Ea = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function T2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ba(e) {
  return e ? "primary" : "secondary";
}
function L2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Ba(t), size: "sm", onClick: () => a(e.kind), children: Ea[e.kind] }) : /* @__PURE__ */ n(b, { variant: Ba(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Ea[e.kind] });
}
function M2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: $n.path, "data-allowed": e.allowed, "data-role": T2(e.requiredRole), children: [
    /* @__PURE__ */ n("span", { className: $n.consequence, children: e.consequence }),
    /* @__PURE__ */ n(L2, { path: e, primary: t, onChoose: a })
  ] });
}
function c4({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: $n.list, children: e.map((a, r) => /* @__PURE__ */ n(M2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const A2 = "_list_1m7i0_2", I2 = "_item_1m7i0_6", E2 = "_node_1m7i0_18", B2 = "_body_1m7i0_24", P2 = "_head_1m7i0_30", q2 = "_stage_1m7i0_36", O2 = "_version_1m7i0_41", D2 = "_sentence_1m7i0_49", H2 = "_meta_1m7i0_54", Le = {
  list: A2,
  item: I2,
  node: E2,
  body: B2,
  head: P2,
  stage: q2,
  version: O2,
  sentence: D2,
  meta: H2
}, F2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function z2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Le.head, children: [
    /* @__PURE__ */ n("span", { className: Le.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Le.version, title: e.version, children: e.version }) : null
  ] });
}
function j2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Le.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Le.node} ward-history-node`, children: /* @__PURE__ */ n(Ke, { size: 9, kind: F2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Le.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(z2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Le.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Le.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function d4({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Le.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(j2, { entry: t }, t.stage + String(a))) });
}
const W2 = "_thread_1dsr3_3", K2 = "_turn_1dsr3_8", G2 = "_who_1dsr3_27", U2 = "_body_1dsr3_32", V2 = "_working_1dsr3_75", Y2 = "_dots_1dsr3_84", J2 = "_step_1dsr3_84", Q2 = "_note_1dsr3_96", fe = {
  thread: W2,
  turn: K2,
  who: G2,
  body: U2,
  working: V2,
  dots: Y2,
  step: J2,
  note: Q2
}, Vn = $e(!1);
function u4({ children: e, density: t }) {
  return /* @__PURE__ */ n(Vn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${fe.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function h4({ turn: e }) {
  if (!ge(Vn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${fe.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: e.body })
  ] });
}
function X2() {
  return /* @__PURE__ */ i("span", { className: fe.dots, "aria-hidden": "true", "data-dots": "true", children: [
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" })
  ] });
}
function Z2({ step: e, note: t }) {
  return /* @__PURE__ */ i("span", { role: "status", className: fe.step, children: [
    e === "" ? null : /* @__PURE__ */ n("span", { children: e }),
    t ? /* @__PURE__ */ n("span", { className: fe.note, children: t }) : null
  ] });
}
function m4({ author: e, step: t, body: a = "", note: r }) {
  if (!ge(Vn)) throw new Error("ChatWorking: must be rendered inside a Conversation");
  const l = a !== "";
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": "agent", "data-turn": "agent", "data-working": "true", children: [
    /* @__PURE__ */ n("span", { className: `${fe.who} ward-chat-who`, children: e }),
    /* @__PURE__ */ i("p", { className: `${fe.working} ward-chat-working`, children: [
      l ? null : /* @__PURE__ */ n(X2, {}),
      /* @__PURE__ */ n(Z2, { step: t, note: r })
    ] }),
    l ? /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: a }) : null
  ] });
}
const eR = "_list_yiolt_3", tR = "_row_yiolt_7", nR = "_label_yiolt_20", aR = "_n_yiolt_26", rR = "_cause_yiolt_33", bt = {
  list: eR,
  row: tR,
  label: nR,
  n: aR,
  cause: rR
};
function lR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const oR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function iR({ row: e, formatNumber: t }) {
  return lR(e), /* @__PURE__ */ i("li", { className: `${bt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ke, { size: 8, ...oR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: bt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${bt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(sR, { cause: e.cause })
  ] });
}
function sR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${bt.cause} ward-healthrow-cause`, children: e }) : null;
}
function w4({ rows: e, formatNumber: t = ne }) {
  return /* @__PURE__ */ n("ul", { className: `${bt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(iR, { row: a, formatNumber: t }, a.label)) });
}
const cR = "_root_1jxwp_2", dR = {
  root: cR
};
function _4({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: dR.root, "data-density": l, children: [
    /* @__PURE__ */ n(an, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const uR = "_row_dhbre_3", hR = "_key_dhbre_13", mR = "_stack_dhbre_24", wR = "_value_dhbre_32", _R = "_evidence_dhbre_39", fR = "_mark_dhbre_47", nt = {
  row: uR,
  key: hR,
  stack: mR,
  value: wR,
  evidence: _R,
  mark: fR
};
function vR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(w, { role: "warn", label: "Check" }) : /* @__PURE__ */ n(On, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function f4({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${nt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${nt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${nt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${nt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${nt.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${nt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(vR, { state: e.state }) })
  ] });
}
const bR = "_cell_gh2sd_2", gR = {
  cell: bR
}, pR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function yR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function NR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function kR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: yR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function $R(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function v4({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  NR(e, a);
  const r = $R(e);
  return /* @__PURE__ */ n(
    gw,
    {
      label: "Rejection rules",
      columns: pR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, o) => /* @__PURE__ */ n("span", { className: gR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: kR(l, o) }),
      empty: t ?? /* @__PURE__ */ n(hf, { sentence: "No rejection rules yet." })
    }
  );
}
const CR = "_row_1f2re_2", SR = "_title_1f2re_12", RR = "_turns_1f2re_18", xR = "_waiting_1f2re_19", TR = "_resolved_1f2re_20", LR = "_activity_1f2re_21", MR = "_cost_1f2re_28", AR = "_link_1f2re_29", IR = "_tableLink_1f2re_47", ER = "_tableRecord_1f2re_48", BR = "_tableRow_1f2re_59", PR = "_tableTitle_1f2re_71", qR = "_tableResolved_1f2re_76", OR = "_tableMeta_1f2re_87", DR = "_tableCost_1f2re_94", HR = "_tableActivity_1f2re_95", FR = "_tableState_1f2re_105", F = {
  row: CR,
  title: SR,
  turns: RR,
  waiting: xR,
  resolved: TR,
  activity: LR,
  cost: MR,
  link: AR,
  tableLink: IR,
  tableRecord: ER,
  tableRow: BR,
  tableTitle: PR,
  tableResolved: qR,
  tableMeta: OR,
  tableCost: DR,
  tableActivity: HR,
  tableState: FR
}, gl = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function zR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function jR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function WR(e) {
  const t = e.join(", ");
  return t === "" ? "—" : t;
}
const KR = { duplicate: "Closed · duplicate" };
function GR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(st, { className: F.tableMeta, text: `waiting on ${e}` });
}
function UR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: F.tableCost, children: e === void 0 ? null : le(e) });
}
function VR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${F.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function YR({ session: e, href: t }) {
  const a = gl[e.state];
  return /* @__PURE__ */ i("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${F.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(st, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: F.tableMeta, children: jR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: F.tableResolved, children: [
      WR(e.resolved),
      /* @__PURE__ */ n(GR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(UR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: F.tableActivity, children: zR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: F.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(w, { role: a.role, label: KR[e.state] ?? a.label }),
      /* @__PURE__ */ n(VR, { link: e.link })
    ] }) })
  ] });
}
function JR({ session: e }) {
  const t = gl[e.state];
  return /* @__PURE__ */ i("div", { className: F.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(st, { className: F.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: F.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(st, { className: F.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: F.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: F.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: F.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: F.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(w, { role: t.role, label: t.label })
  ] });
}
function b4(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(YR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(JR, { session: e.session });
}
const QR = "_block_1yy2v_3", XR = "_list_1yy2v_9", ZR = "_line_1yy2v_14", Cn = {
  block: QR,
  list: XR,
  line: ZR
}, ex = { warn: "warning", ok: "ok" };
function tx({ kind: e }) {
  const t = ex[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function nx({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${Cn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(tx, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function g4({ lines: e, label: t = "Agent input" }) {
  return /* @__PURE__ */ n("div", { className: `${Cn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Cn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(nx, { line: a }, `${r}-${a.text}`)) }) });
}
const ax = "_band_tt7hp_1", rx = "_head_tt7hp_8", lx = "_cell_tt7hp_19", ox = "_index_tt7hp_35", ix = "_title_tt7hp_42", sx = "_note_tt7hp_48", cx = "_cellTitle_tt7hp_53", dx = "_cellBody_tt7hp_58", ux = "_tag_tt7hp_64", Re = {
  band: ax,
  head: rx,
  cell: lx,
  index: ox,
  title: ix,
  note: sx,
  cellTitle: cx,
  cellBody: dx,
  tag: ux
}, Pa = 4;
function p4({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== Pa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Pa}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Re.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: Re.head, children: [
      /* @__PURE__ */ n("span", { className: Re.index, children: e }),
      /* @__PURE__ */ n("span", { className: Re.title, children: t }),
      /* @__PURE__ */ n("span", { className: Re.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ i("div", { className: Re.cell, children: [
      /* @__PURE__ */ n("span", { className: Re.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: Re.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: Re.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const hx = "_tag_1yuvz_2", mx = "_link_1yuvz_14", wn = {
  tag: hx,
  link: mx
};
function pl({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: wn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${wn.tag} ${wn.link}`, href: T(t), children: e });
}
const wx = "_eyebrow_m8swv_2", _x = "_link_m8swv_10", qa = {
  eyebrow: wx,
  link: _x
};
function rn({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: qa.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${qa.link} ward-target`, href: T(t), children: e }) });
}
const fx = "_figure_qz9i7_2", vx = "_media_qz9i7_9", bx = "_caption_qz9i7_35", _n = {
  figure: fx,
  media: vx,
  caption: bx
};
function gx(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Sn(e) {
  return /* @__PURE__ */ i("figure", { className: _n.figure, children: [
    /* @__PURE__ */ n("div", { className: _n.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(gx, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: _n.caption, children: e.caption })
  ] });
}
function $t(e) {
  return `h${e}`;
}
function px(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const yx = "_prose_1fxb9_2", Nx = "_anchor_1fxb9_79", yl = {
  prose: yx,
  anchor: Nx
};
function Rn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: yl.prose, children: e });
}
function y4({ level: e, children: t, id: a }) {
  const r = $t(e), l = a ?? px(t);
  return /* @__PURE__ */ i(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${yl.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const kx = "_list_176jq_2", $x = "_pair_176jq_8", Cx = "_term_176jq_14", Sx = "_value_176jq_19", Lt = {
  list: kx,
  pair: $x,
  term: Cx,
  value: Sx
};
function Rx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Lt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: Lt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Lt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Lt.value, children: t.value })
  ] }, t.term)) });
}
const xx = "_nav_sgeyg_2", Tx = "_item_sgeyg_6", Lx = "_link_sgeyg_13", Mx = "_note_sgeyg_30", Mt = {
  nav: xx,
  item: Tx,
  link: Lx,
  note: Mx
};
function Ax({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Mt.nav, children: /* @__PURE__ */ n(Nw, { children: t.map((a) => /* @__PURE__ */ i("li", { className: Mt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Mt.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Mt.note, children: a.note })
  ] }, a.href)) }) });
}
const Ix = "_header_kelio_2", Ex = "_skip_kelio_14", Bx = "_brand_kelio_39", Px = "_list_kelio_46", qx = "_link_kelio_56", at = {
  header: Ix,
  skip: Ex,
  brand: Bx,
  list: Px,
  link: qx
};
function N4({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: o = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: at.header, children: [
    /* @__PURE__ */ n("a", { className: at.skip, href: `#${l}`, children: o }),
    /* @__PURE__ */ n("a", { className: `${at.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: at.nav, children: /* @__PURE__ */ n("ul", { className: at.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${at.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const Ox = "_footer_1jb5e_2", Dx = "_note_1jb5e_12", Hx = "_list_1jb5e_18", Fx = "_link_1jb5e_27", At = {
  footer: Ox,
  note: Dx,
  list: Hx,
  link: Fx
};
function k4({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: At.footer, children: [
    /* @__PURE__ */ n("p", { className: At.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: At.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${At.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const zx = "_intro_13128_2", jx = "_title_13128_9", Wx = "_lead_13128_17", fn = {
  intro: zx,
  title: jx,
  lead: Wx
};
function Yn({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: o }) {
  const s = $t(l);
  return /* @__PURE__ */ i("header", { className: fn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: fn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: fn.lead, children: r }),
    o
  ] });
}
const Kx = "_section_u0k7p_2", Gx = "_head_u0k7p_13", Ux = "_titles_u0k7p_21", Vx = "_title_u0k7p_21", Yx = "_link_u0k7p_34", ft = {
  section: Kx,
  head: Gx,
  titles: Ux,
  title: Vx,
  link: Yx
};
function Jx({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const o = $t(l);
  return /* @__PURE__ */ i("div", { className: ft.head, children: [
    /* @__PURE__ */ i("div", { className: ft.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(rn, { children: a }),
      /* @__PURE__ */ n(o, { className: ft.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ft.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function $4({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: o = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: ft.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(Jx, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: o }),
    t
  ] });
}
const Qx = "_split_1ycaa_2", Xx = "_main_1ycaa_10", Zx = "_aside_1ycaa_15", vn = {
  split: Qx,
  main: Xx,
  aside: Zx
};
function eT({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: vn.split, children: [
    /* @__PURE__ */ n("div", { className: vn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: vn.aside, "aria-label": a, children: t })
  ] });
}
const tT = "_hero_ehbct_2", nT = "_text_ehbct_11", aT = "_visual_ehbct_23", rT = "_title_ehbct_28", lT = "_lead_ehbct_36", oT = "_actions_ehbct_42", iT = "_action_ehbct_42", sT = "_primary_ehbct_63", cT = "_secondary_ehbct_72", Ee = {
  hero: tT,
  text: nT,
  visual: aT,
  title: rT,
  lead: lT,
  actions: oT,
  action: iT,
  primary: sT,
  secondary: cT
};
function dT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ee.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ee.action} ${a === 0 ? Ee.primary : Ee.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function uT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ee.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ee.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ee.lead, children: a }),
    /* @__PURE__ */ n(dT, { actions: r })
  ] });
}
function C4({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ee.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(uT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ee.visual, children: e })
  ] });
}
const hT = "_chain_w2k2l_2", mT = "_step_w2k2l_12", wT = "_arrow_w2k2l_19", _T = "_box_w2k2l_24", It = {
  chain: hT,
  step: mT,
  arrow: wT,
  box: _T
};
function S4({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: It.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ i("li", { className: It.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: It.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: It.box, children: r })
  ] }, l)) });
}
const fT = "_card_1u2gr_2", vT = "_featured_1u2gr_20", bT = "_media_1u2gr_28", gT = "_body_1u2gr_32", pT = "_title_1u2gr_48", yT = "_link_1u2gr_60", NT = "_summary_1u2gr_78", kT = "_tags_1u2gr_84", $T = "_cta_1u2gr_90", ve = {
  card: fT,
  featured: vT,
  media: bT,
  body: gT,
  title: pT,
  link: yT,
  summary: NT,
  tags: kT,
  cta: $T
};
function Nl({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: ve.media, children: /* @__PURE__ */ n(Sn, { ratio: t, children: e }) });
}
function CT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = $t(a);
  return /* @__PURE__ */ n(r, { className: ve.title, children: /* @__PURE__ */ n("a", { className: ve.link, href: T(e), children: t }) });
}
function kl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(rn, { children: e }),
    /* @__PURE__ */ n(CT, { ...t })
  ] });
}
function $l({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: ve.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: ve.tags, children: t.map((a) => /* @__PURE__ */ n(pl, { label: a }, a)) })
  ] });
}
function R4({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...o }) {
  return /* @__PURE__ */ i("article", { className: ve.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(Nl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n(kl, { eyebrow: a, ...o }),
      /* @__PURE__ */ n($l, { summary: r, tags: l })
    ] })
  ] });
}
function x4({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: o, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${ve.card} ${ve.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(Nl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n(kl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n($l, { summary: r, tags: l }),
      o === void 0 ? null : /* @__PURE__ */ i("span", { className: ve.cta, "aria-hidden": "true", children: [
        o,
        " →"
      ] })
    ] })
  ] });
}
const ST = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Cl(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${ST[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const RT = "_row_1peme_2", xT = "_title_1peme_15", TT = "_link_1peme_23", LT = "_meta_1peme_40", MT = "_summary_1peme_46", wt = {
  row: RT,
  title: xT,
  link: TT,
  meta: LT,
  summary: MT
};
function T4({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: o = 3 }) {
  const s = $t(o);
  return /* @__PURE__ */ i("article", { className: wt.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: wt.title, children: /* @__PURE__ */ n("a", { className: wt.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: wt.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: Cl(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: wt.summary, children: l })
  ] });
}
const AT = "_list_dd8kj_2", IT = "_item_dd8kj_16", Oa = {
  list: AT,
  item: IT
};
function L4({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Oa.list, role: "list", "aria-label": a, "data-rules": t, children: ja.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Oa.item, children: r }, l)) });
}
const ET = "_page_i3r2z_2", BT = "_aside_i3r2z_8", PT = "_tags_i3r2z_13", Jn = {
  page: ET,
  aside: BT,
  tags: PT
};
function qT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Jn.tags, children: e.map((t) => /* @__PURE__ */ n(pl, { label: t }, t)) });
}
function OT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function DT(e) {
  return e.filter(OT).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(qT, { labels: a })
  }));
}
function HT({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Jn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(Rx, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(Ax, { label: a, links: t })
  ] });
}
function Sl({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Rn, { children: l }) : /* @__PURE__ */ n(eT, { asideLabel: r, aside: /* @__PURE__ */ n(HT, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Rn, { children: l }) });
}
function M4({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: o, period: s, focus: c, stack: d, related: u }) {
  const h = DT([
    ["Role", o],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Jn.page, children: [
    /* @__PURE__ */ n(Yn, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(Sl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const FT = "_page_1junb_2", zT = "_source_1junb_8", jT = "_shots_1junb_30", xn = {
  page: FT,
  source: zT,
  shots: jT
};
function WT({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Sn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: xn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Sn, { ...a, ratio: t }) }, r)) });
}
function A4(e) {
  const { title: t, summary: a, children: r, source: l, facts: o = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: xn.page, children: [
    /* @__PURE__ */ n(Yn, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: xn.source, href: T(l.href), children: l.label }) }),
    /* @__PURE__ */ n(WT, { shots: s, ratio: c }),
    /* @__PURE__ */ n(Sl, { facts: o, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function KT(e) {
  const t = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const o = a[a.length - 1];
    (o === void 0 ? t : o.children).push(l), a.push(l);
  }
  return t;
}
const GT = "_article_drsu4_2", UT = "_meta_drsu4_8", VT = "_tldr_drsu4_14", YT = "_tldrLabel_drsu4_21", JT = "_tldrText_drsu4_27", QT = "_toc_drsu4_40", XT = "_tocTitle_drsu4_44", ZT = "_tocList_drsu4_50", eL = "_tocLink_drsu4_65", Be = {
  article: GT,
  meta: UT,
  tldr: VT,
  tldrLabel: YT,
  tldrText: JT,
  toc: QT,
  tocTitle: XT,
  tocList: ZT,
  tocLink: eL
};
function tL({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Be.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: Cl(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function nL({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Be.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Be.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Be.tldrText, children: e })
  ] });
}
function Rl({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Be.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Be.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(Rl, { nodes: t.children })
  ] }, t.id)) });
}
function aL({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Be.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Be.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(Rl, { nodes: KT(e) })
  ] });
}
function I4({ title: e, date: t, children: a, minutes: r, tldr: l, headings: o = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Be.article, children: [
    /* @__PURE__ */ n(Yn, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(tL, { date: t, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ n(nL, { children: l }),
    /* @__PURE__ */ n(aL, { headings: o }),
    /* @__PURE__ */ n(Rn, { children: a })
  ] });
}
const rL = 220;
function lL(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function E4(e) {
  return Math.max(1, Math.ceil(lL(e) / rL));
}
const Vt = { w: 184, h: 96 }, ct = { w: 152, h: 48 }, Yt = 16, Et = (e) => Math.round(e * 10) / 10;
function xl(e) {
  return { x: Yt + e.col * Vt.w, y: Yt + e.row * Vt.h, w: ct.w, h: ct.h };
}
function oL(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Yt + t * Vt.w + ct.w, h: 2 * Yt + a * Vt.h + ct.h };
}
function Da(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function iL(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, l = t.x + t.w / 2 - a, o = t.y + t.h / 2 - r, s = Da(e, l, o), c = 1 - Da(t, l, o);
  return { x1: Et(a + l * s), y1: Et(r + o * s), x2: Et(a + l * c), y2: Et(r + o * c) };
}
function sL() {
  const [e, t] = v(!1);
  return S(() => {
    var l;
    const a = (l = window.matchMedia) == null ? void 0 : l.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (o) => t(o.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const cL = "_diagram_76e4t_2", dL = "_label_76e4t_9", uL = "_svg_76e4t_14", hL = "_node_76e4t_20", mL = "_edge_76e4t_33", wL = "_arrow_76e4t_38", _L = "_controls_76e4t_63", fL = "_live_76e4t_70", vL = "_steps_76e4t_77", Me = {
  diagram: cL,
  label: dL,
  svg: uL,
  node: hL,
  edge: mL,
  arrow: wL,
  controls: _L,
  live: fL,
  steps: vL
};
function bL({ nodes: e, edges: t, lit: a, marker: r }) {
  const l = new Map(e.map((o) => [o.id, xl(o)]));
  return t.map((o) => {
    const s = l.get(o.from), c = l.get(o.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(o.from) && a(o.to);
    return /* @__PURE__ */ n("line", { className: Me.edge, "data-active": d, ...iL(s, c), markerEnd: `url(#${r})` }, `${o.from}>${o.to}`);
  });
}
function gL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = xl(a);
    return /* @__PURE__ */ i("g", { className: Me.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + ct.w / 2, y: r.y + ct.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Ha({ label: e, to: t, count: a, go: r, status: l }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: l, children: e }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => r(t), children: e });
}
function pL({ at: e, count: t, text: a, go: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { className: Me.controls, children: [
    /* @__PURE__ */ n(Ha, { label: "Back", to: e - 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n(Ha, { label: "Next", to: e + 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n("p", { className: Me.live, id: l, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function B4({ label: e, nodes: t, edges: a, steps: r }) {
  const l = sL() && r.length > 0, [o, s] = v(0), c = y(), d = (h) => l && r[o].nodes.includes(h), u = oL(t);
  return /* @__PURE__ */ i("figure", { className: Me.diagram, "data-live": l, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Me.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Me.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Me.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(bL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(gL, { nodes: t, lit: d })
    ] }),
    l ? /* @__PURE__ */ n(pL, { at: o, count: r.length, text: r[o].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Me.steps, children: r.map((h, m) => /* @__PURE__ */ n("li", { "aria-current": l && m === o ? "step" : void 0, children: h.text }, m)) })
  ] });
}
export {
  ML as ACCENT_PRESETS,
  a3 as ActionStack,
  a4 as ActivityConsole,
  HL as AdminIcon,
  Rg as AgentCard,
  B4 as AnimatedDiagram,
  zL as AppShell,
  F3 as AppearanceStrip,
  I4 as Article,
  p4 as Band,
  t3 as BarChart,
  Uf as BoardColumn,
  p3 as BoardFootnote,
  y3 as BoardHeader,
  OL as BoardIcon,
  u3 as BoardScroller,
  b as Btn,
  LL as CHIP_ROLES,
  IL as CONTRASTS,
  ll as CREDENTIAL_COLUMNS,
  XL as Callout,
  z3 as CapabilityRow,
  m3 as CardGrid,
  M4 as CaseStudy,
  h4 as ChatMessage,
  m4 as ChatWorking,
  nr as Checkbox,
  w as Chip,
  st as ClampText,
  r4 as ClarificationRow,
  M3 as ClauseRuleRow,
  L3 as ClauseRules,
  Or as ColourLadder,
  j3 as ComponentRow,
  l4 as Composer,
  k3 as ConfigRow,
  N3 as ConfigRowHead,
  Dn as ConnectionMark,
  n4 as ConsoleAnnounceProvider,
  u4 as Conversation,
  lw as CostMeter,
  K3 as CredentialRow,
  W3 as CredentialRowHead,
  o4 as CriteriaList,
  _c as Crumb,
  AL as DENSITIES,
  w4 as DeliveryHealth,
  _3 as DeniedState,
  PL as DisabledScope,
  I3 as DryRunRail,
  hf as EmptyState,
  G3 as EnvCard,
  rn as Eyebrow,
  Rx as FactList,
  x4 as FeaturedCard,
  E as Field,
  Sn as Figure,
  w3 as FilteredEmpty,
  S4 as FlowChain,
  jL as FoldText,
  c3 as FormStack,
  an as GateChecklist,
  i4 as GateLadder,
  gw as Grid,
  B3 as HandoffRuleRow,
  E3 as HandoffRules,
  C4 as Hero,
  qL as HomeIcon,
  ZL as InfoTip,
  $3 as ItemDrawer,
  U3 as KeyPanel,
  Yl as LIVE_EVENT_TYPES,
  Yb as LegacyBoardColumn,
  S3 as LegacyBoardHeader,
  R3 as LegacyConfigRow,
  T3 as LegacyItemDrawer,
  zb as LegacyOverCapNote,
  x3 as LegacyPreviewRail,
  Br as LegacyWorkCard,
  Ax as LinkList,
  Pe as LiveIndicator,
  f3 as LoadFailed,
  g3 as Loading,
  ul as MCP_SERVER_COLUMNS,
  On as Mark,
  Y3 as MarkUpload,
  Ke as Marker,
  Q3 as McpServerRow,
  J3 as McpServerRowHead,
  fr as Menu,
  mr as MenuButton,
  P3 as NewStreamModal,
  ff as OverCapNote,
  In as OverflowRow,
  ut as Overlay,
  WL as OwedCard,
  A3 as PARTIAL_STEP_REASON,
  hl as POLICY_CHIP_WIDTH,
  o3 as PageFrame,
  QL as PageHeader,
  Yn as PageIntro,
  e3 as PeriodPicker,
  Nw as PlainList,
  X3 as PolicyRow,
  T4 as PostRow,
  C3 as PreviewRail,
  R4 as ProjectCard,
  A4 as ProjectPage,
  Rn as Prose,
  y4 as ProseHeading,
  un as ROLE_MATRIX_COLUMNS,
  Qr as RULE_ACTIONS,
  Sr as Radio,
  _4 as ReadyChecklist,
  s3 as RecordSection,
  s4 as RequeueSheet,
  c4 as ResolveBlock,
  f4 as ResolvedFieldRow,
  Z3 as RoleMatrixRow,
  v4 as RoutingTable,
  q3 as RuleRow,
  e4 as RunbookSteps,
  Vl as STREAM_STEPS,
  $4 as Section,
  d3 as SectionBand,
  ga as SectionHeader,
  kr as SegmentedControl,
  dr as Select,
  b4 as SessionRow,
  VL as Sidebar,
  FL as SidebarFoldButton,
  k4 as SiteFooter,
  N4 as SiteHeader,
  eT as SplitLayout,
  O3 as StageColumn,
  h3 as StageGrid,
  d4 as StageHistory,
  aN as StageListEditor,
  KL as StageSteps,
  v3 as StaleStrip,
  en as StatStrip,
  r3 as StatTiles,
  JL as StreamAvatar,
  D3 as StreamRow,
  DL as StudioIcon,
  i3 as SubjectRail,
  Xe as Switch,
  UL as TabLinks,
  n3 as TableHead,
  GL as Tabs,
  pl as Tag,
  L4 as TextList,
  SL as ThemeProvider,
  H3 as ToolRow,
  l3 as TopBar,
  C_ as Tree,
  Mr as TreeRow,
  g4 as TypedInputBlock,
  Hi as UNSAFE_HREF,
  t4 as ValidationList,
  $L as VisibilityProvider,
  CL as Visible,
  TL as WARD_VERSION,
  nn as WorkCard,
  b3 as WriteUnavailableStrip,
  zR as agoSince,
  El as clock,
  pN as colourStatus,
  ne as count,
  se as duration,
  Tn as elapsed,
  xL as eventSourceTransport,
  Cl as formatDate,
  $t as headingTag,
  Qt as isStreamStep,
  yt as isValidatedStreamStep,
  np as ladderValidation,
  H0 as mcpConnectionChip,
  O0 as mcpToolName,
  le as money,
  ye as ms,
  Ar as ordered,
  Ka as ratio,
  E4 as readTime,
  o$ as restartLabel,
  T as safeHref,
  px as slug,
  me as stamp,
  Ln as stream,
  EL as streamChip,
  En as streamChipProps,
  ke as streamColour,
  Xl as streamHex,
  Ft as streamInitials,
  Jl as streamVars,
  YL as uniqueStreamInitials,
  or as useAnchoredPanel,
  Bt as useBorderFlash,
  qe as useDisabledScope,
  Kl as useFocusTrap,
  BL as useLiveFeed,
  RL as useReturnFocus,
  Jt as useRovingTabindex,
  Mn as useTicker,
  Bl as useVisible,
  P as v,
  V3 as validateMark,
  Zt as validatedStep,
  Ua as validatedStreamSteps,
  lL as wordCount
};
