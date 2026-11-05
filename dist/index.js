import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Fa, useContext as ge, createContext as $e, useState as v, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as Qe, useId as y, Fragment as za, isValidElement as Tl, Children as ja } from "react";
import { createPortal as Ll, flushSync as Wa } from "react-dom";
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
const Ml = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const t = Ml.formatToParts(new Date(e)), a = (r) => {
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
const Al = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function El(e) {
  return Al.format(new Date(e));
}
const Ga = $e(/* @__PURE__ */ new Set());
function SL({ hidden: e, children: t }) {
  const a = Fa(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ga.Provider, { value: a, children: t });
}
function Il(e) {
  return !ge(Ga).has(e);
}
function RL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Il(e) ? t : a });
}
const Bl = "(prefers-color-scheme: dark)", Pl = "(prefers-contrast: more)";
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
function ql(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Ol(e, t) {
  return e === "system" ? t ? "more" : null : e === "more" ? "more" : null;
}
function xL({ theme: e, accent: t = "green", density: a = "comfortable", contrast: r = "standard", children: l }) {
  const o = Zn(Bl, e === "system"), s = Zn(Pl, r === "system");
  return Ct("data-theme", ql(e, o)), Ct("data-accent", t), Ct("data-density", a), Ct("data-contrast", Ol(r, s)), /* @__PURE__ */ n(x, { children: l });
}
const Dl = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Hl(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Fl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function zl(e, t, a, r) {
  return e.shiftKey ? Hl(t, a) ? r : void 0 : document.activeElement === r || Fl(t) ? a : void 0;
}
function jl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const o = zl(e, t, r, l);
  o && (e.preventDefault(), o.focus());
}
function Wl(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Dl));
      jl(a, e.current, r);
    },
    [e]
  ) };
}
function TL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, o;
      (o = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || o.call(l);
    };
  }, [t, e]);
}
const ea = { ArrowUp: -1, ArrowDown: 1 }, ta = { ArrowLeft: -1, ArrowRight: 1 }, Kl = (e, t, a) => Math.min(a, Math.max(t, e));
function Gl(e, t) {
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
      const m = Math.max(0, h.indexOf(t)), _ = Gl(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Kl(m + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const LL = (e, t, a) => {
  const r = new EventSource(e), l = (o) => a.onEvent(o.data, o.lastEventId, o.type);
  r.onmessage = l;
  for (const o of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(o, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, ML = "0.2.0", AL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ul = [1, 2, 3, 4, 5, 6], Ua = [1, 2, 3], Vl = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], EL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], IL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], BL = [{ name: "standard", label: "Standard" }, { name: "more", label: "High" }], P = {
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
  return Ul.includes(e);
}
function yt(e) {
  return Ua.includes(e);
}
function Yl(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function PL(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Jl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ql(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return Jl[e];
}
function na(e) {
  return typeof e != "string" ? null : Vl.includes(e) ? e : null;
}
function Xl(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Zl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function eo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function to(e, t, a) {
  const r = Xl(e);
  if (r === null) return null;
  const l = na(a) ?? na(r.type);
  return l === null ? null : { ...r, type: l, id: Zl(r, t), at: eo(r) };
}
function no(e, t) {
  return e >= ye.staleAfter ? "stale" : e >= ye.heartbeat && t === "live" ? "reconnecting" : null;
}
function ao(e, t, a) {
  return e >= ye.heartbeat && !t && a !== null;
}
function qL(e, t) {
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
        const Ge = to(A, V, Se);
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
    const A = Date.now() - c.current, V = no(A, k.current);
    V && M(V);
    const Se = h.current;
    ao(A, N.current, Se) && Ce(Se);
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
const ro = { blue: "running", orange: "waiting", green: "done" };
function lo() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function aa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Bt(e, t) {
  const a = f(0), r = Z((l) => {
    const o = l ?? t, s = e.current;
    s !== null && o !== void 0 && (lo() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${ro[o]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => aa(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => aa(s), ye.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const oo = "_root_1otpc_2", io = {
  root: oo
};
function so(e, t, a, r, l) {
  const o = [Tn(t)];
  return e || o.push(`as of ${El(a)}`), r && o.push(`turn ${r[0]}/${r[1]}`), l && o.push(l.label), o;
}
function Pe({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", o = Mn(e, l), s = (t == null ? void 0 : t.at) ?? e, c = so(l, o, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${io.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const co = "_app_ge95k_1", uo = "_side_ge95k_35", ho = "_sideTop_ge95k_46", mo = "_sideBody_ge95k_60", wo = "_foldSlot_ge95k_86", _o = "_iconRail_ge95k_110", fo = "_railItem_ge95k_119", vo = "_railIcon_ge95k_140", bo = "_railDot_ge95k_145", go = "_railLetter_ge95k_151", po = "_main_ge95k_157", yo = "_rail_ge95k_119", No = "_page_ge95k_179", ko = "_headerRow_ge95k_202", $o = "_sidebarToggle_ge95k_209", Co = "_headerSlot_ge95k_214", So = "_headerAction_ge95k_219", Ro = "_drawerSide_ge95k_224", xo = "_root_ge95k_271", To = "_topbar_ge95k_278", Lo = "_mark_ge95k_289", Mo = "_brand_ge95k_296", Ao = "_tagline_ge95k_302", Eo = "_identity_ge95k_308", Io = "_tools_ge95k_309", Bo = "_nav_ge95k_319", Po = "_metadata_ge95k_326", qo = "_actor_ge95k_341", Oo = "_detail_ge95k_342", Do = "_content_ge95k_387", Ho = "_toolsPanel_ge95k_403", Fo = "_skip_ge95k_429", $ = {
  app: co,
  side: uo,
  sideTop: ho,
  sideBody: mo,
  foldSlot: wo,
  iconRail: _o,
  railItem: fo,
  railIcon: vo,
  railDot: bo,
  railLetter: go,
  main: po,
  rail: yo,
  page: No,
  headerRow: ko,
  sidebarToggle: $o,
  headerSlot: Co,
  headerAction: So,
  drawerSide: Ro,
  root: xo,
  topbar: To,
  mark: Lo,
  brand: Mo,
  tagline: Ao,
  identity: Eo,
  tools: Io,
  nav: Bo,
  metadata: Po,
  actor: qo,
  detail: Oo,
  content: Do,
  toolsPanel: Ho,
  skip: Fo
};
function dt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const zo = "_scope_1an6i_2", jo = {
  scope: zo
}, Va = $e(null);
function OL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${jo.scope} ward-disabled-scope`, children: [
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
const Wo = "_btn_1mk1f_2", Ko = "_primary_1mk1f_14", Go = "_destructive_1mk1f_25", Uo = "_secondary_1mk1f_35", Vo = "_ghost_1mk1f_40", Yo = "_overflow_1mk1f_49", Jo = "_sm_1mk1f_56", Qo = "_disabled_1mk1f_60", Xo = "_withReason_1mk1f_68", Zo = "_reason_1mk1f_74", lt = {
  btn: Wo,
  primary: Ko,
  destructive: Go,
  secondary: Uo,
  ghost: Vo,
  overflow: Yo,
  sm: Jo,
  disabled: Qo,
  withReason: Xo,
  reason: Zo
};
function ei(e, t, a, r) {
  const l = t === "sm" ? [lt.sm, "ward-btn--sm"] : [], o = a ? [lt.disabled] : [];
  return [lt.btn, lt[e], "ward-btn", `ward-btn--${e}`, ...l, ...o, r ?? ""].filter(Boolean).join(" ");
}
function ti(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ni(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function ai(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ri(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function li(e, t, a) {
  return ri(e.describedBy, t && a);
}
function oi({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${lt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function ii(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = qe()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(si, { ...e });
}
function si(e) {
  const t = qe();
  ni(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), o = ai(e, t), s = y(), c = ci(o, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ei(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: o,
        "aria-describedby": li(e, o, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ti(a, e.controls),
        children: ii(e)
      }
    ),
    /* @__PURE__ */ n(oi, { id: s, reason: o, shown: c === Ya })
  ] });
}
function ci(e, t) {
  return e && !t ? Ya : za;
}
function Ya({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${lt.withReason} ward-btn-withReason`, children: e });
}
let An = "none";
function di(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (An = "key");
}
typeof document < "u" && (document.addEventListener("keydown", di, !0), document.addEventListener("pointerdown", () => {
  An = "pointer";
}, !0));
function ui() {
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
const hi = "_scrim_1cawq_2", mi = "_drawer_1cawq_10", wi = "_sheet_1cawq_14", _i = "_modal_1cawq_18", fi = "_panel_1cawq_23", vi = "_start_1cawq_44", bi = "_header_1cawq_67", gi = "_title_1cawq_75", pi = "_body_1cawq_79", yi = "_close_1cawq_106", Ae = {
  scrim: hi,
  drawer: mi,
  sheet: wi,
  modal: _i,
  panel: fi,
  start: vi,
  header: bi,
  title: gi,
  body: pi,
  close: yi
}, Ni = $e(null), Dt = [], Ht = /* @__PURE__ */ new Map();
function ki(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function $i(e, t) {
  let a = Ht.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Ht.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Ci(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !ki(r) && $i(e, r);
}
function Si(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Ci(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Ri(e) {
  for (const t of e.claims) {
    const a = Ht.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Ht.delete(t)));
  }
}
function xi(e, t) {
  const a = { root: e, claims: [] };
  return Dt.push(a), Si(a, t), a;
}
function Ti(e) {
  const t = Dt.indexOf(e);
  t >= 0 && Dt.splice(t, 1), Ri(e);
}
function ra(e) {
  return e !== null && Dt.at(-1) === e;
}
function Li(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const o = e.current;
    if (!o) return;
    const s = document.activeElement, c = xi(o, t);
    return r.current = c, () => {
      var u, h;
      const d = ra(c);
      Ti(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Z(() => ra(r.current), []);
}
function Mi(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ai(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ei({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Ae.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ae.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Ii(e) {
  return `${Ae.scrim} ${Ae[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Bi(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Ae.panel} ${Ae[e]} ward-overlay-panel${a}${r}`;
}
function Pi(e) {
  const t = ge(Ni);
  return e ?? t ?? document.body;
}
function ut(e) {
  const t = f(null), a = f(null), r = y(), l = Pi(e.container), o = gt("(min-width: 768px)"), s = Mi(e.kind, o), c = Ai(e, r), d = Wl(a), [u] = v(ui), h = Li(t, l, e.returnFocusTo), m = Z(() => {
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
  }, [m]), Ll(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Ii(s),
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
            className: Bi(s, e.wide),
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
const qi = /^([a-z][a-z0-9+.-]*):/i, Oi = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Di = "#";
function Hi(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = qi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function T(e) {
  const t = Hi(e);
  return t === void 0 || Oi.has(t) ? e : Di;
}
function Fi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ja(e) {
  const t = Fi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function zi(e, t) {
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
function ji(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function Wi(e, t, a) {
  Qe(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const o = ji(r, l);
    o !== null && (r.scrollLeft = Math.max(0, o)), Ja(r);
  }, [e, t, a]);
}
const Ki = "_row_11g8i_2", Gi = {
  row: Ki
};
function Ui(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function En({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: o, className: s, ...c }) {
  const d = f(null), u = o ?? d;
  return zi(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Gi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ui(l, r), ...c, children: t });
}
const Vi = "_icon_1ylqy_2", Yi = {
  icon: Vi
};
function Nt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Yi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function DL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function HL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function FL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function zL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ji() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Qa = "ward:sidebar-collapsed", Qi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Xi() {
  try {
    return window.localStorage.getItem(Qa) === "true";
  } catch {
    return !1;
  }
}
function Zi(e) {
  try {
    window.localStorage.setItem(Qa, String(e));
  } catch {
  }
}
function es(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ts(e) {
  return e instanceof Element && e.closest(Qi) !== null;
}
function ns(e) {
  return e.key === "[" && !es(e) && !ts(e.target);
}
function as(e) {
  const [t, a] = v(Xi), r = () => {
    Zi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (o) => {
      var c;
      if (!ns(o)) return;
      const s = o.target instanceof Element ? o.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function rs() {
  const e = gt("(max-width: 767.98px)"), t = gt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function ls(e) {
  const t = e === "phone", a = y(), r = f(null), [l, o] = v(!1);
  return l && !t && o(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => o(!l), close: () => o(!1) };
}
function os({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e }),
    tr(t) && /* @__PURE__ */ n("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function is(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function ss({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (is(a.open, a.close), !a.open) return null;
  const r = (o) => {
    o.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ut, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: Xa(e, !1) }) });
}
function cs(e) {
  const [t, a] = v(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ds(e, t) {
  const a = as(e === "wide" && !t), r = cs(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function us(e, t) {
  const a = ds(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ms(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const hs = (e) => e.collapsed && e.drawsStrip;
function ms(e, t) {
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
    /* @__PURE__ */ n(Ji, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t })
  ] }) });
}
function ws({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(Za, { fold: e }) });
}
const er = $e(null);
function jL() {
  const e = ge(er);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Za, { fold: e });
}
function _s({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Ln(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function fs({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: $.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(_s, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function vs({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const o = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(ws, { fold: r, inSidebar: l && !o }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: o, children: Xa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(fs, { items: a ?? [], label: t })
  ] });
}
const tr = (e) => e != null;
function bs(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: o, iconRail: s, pageFill: c } = e, d = tr(o), u = rs(), h = ls(u), m = us(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(m.collapsed), "data-consumer-fold": la(hs(m)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(er.Provider, { value: m, children: /* @__PURE__ */ n(vs, { sidebar: t, label: _, iconRail: s, fold: m, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(os, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: $.page, "data-fill": la(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: $.rail, children: o }),
    /* @__PURE__ */ n(ss, { sidebar: t, label: _, drawer: h })
  ] });
}
function gs({ destinations: e, active: t }) {
  const a = f(null);
  return Wi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(En, { as: "nav", rowRef: a, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function bn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function ps({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(bn, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(bn, { value: t, className: $.detail })
  ] });
}
function ys() {
  const e = gt("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = v(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ns({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: $.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function ks({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function $s(e) {
  return /* @__PURE__ */ i("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(bn, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(gs, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(ps, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ns, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Cs(e) {
  const t = y(), a = ys();
  return /* @__PURE__ */ i("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n($s, { ...e, menu: a }),
    /* @__PURE__ */ n(ks, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: $.content, children: e.children })
  ] });
}
function Ss(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function WL(e) {
  return Ss(e) ? /* @__PURE__ */ n(bs, { ...e }) : /* @__PURE__ */ n(Cs, { ...e });
}
const Rs = "_root_itg9o_2", xs = "_row_itg9o_8", Ts = "_box_itg9o_14", Ls = "_label_itg9o_21", Ms = "_labelHidden_itg9o_26", As = "_consequence_itg9o_44", Es = "_sample_itg9o_79", Ve = {
  root: Rs,
  row: xs,
  box: Ts,
  label: Ls,
  labelHidden: Ms,
  consequence: As,
  sample: Es
};
function Is(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Bs({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Ve.consequence} ward-check-consequence`, children: t }) : null;
}
function Ps(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function qs(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, o = Ps(e, a, r), s = o ? `${t}-reason` : void 0, c = Xt(dt(l, e.describedBy, s), r);
  return { noteId: l, reason: o, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? o } };
}
function Os({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ds({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.sample, "aria-hidden": "true", children: e }) : null;
}
function nr(e) {
  const t = y(), a = qe(), r = Is(e, a), l = qs(e, t, r.disabled, a);
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
      /* @__PURE__ */ n(Ds, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Os, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(Bs, { id: l.noteId, text: e.consequence })
  ] });
}
const Hs = "_chip_pq6tb_2", Fs = {
  chip: Hs
}, zs = {
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
function js(e, t) {
  if (e === "stream") return Ws(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = zs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Ws(e) {
  if (!e || !yt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Ln(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function w({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Fs.chip} ward-chip ward-chip--${e}`, style: js(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Ks = "_clamp_zn74g_3", oa = {
  clamp: Ks
};
function st({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? oa.clamp : `${oa.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Gs = "_root_1btz3_2", Us = "_body_1btz3_10", Vs = "_toggle_1btz3_24", ln = {
  root: Gs,
  body: Us,
  toggle: Vs
};
function KL({ children: e, lines: t = 3, label: a }) {
  const [r, l] = v(!1), o = y();
  return /* @__PURE__ */ i("div", { className: ln.root, children: [
    /* @__PURE__ */ n("div", { id: o, className: ln.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: ln.toggle, "aria-expanded": r, "aria-controls": o, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Ys = "_root_1a4s8_2", Js = "_words_1a4s8_16", Qs = "_title_1a4s8_23", Xs = "_actions_1a4s8_27", St = {
  root: Ys,
  words: Js,
  title: Qs,
  actions: Xs
};
function GL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: St.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: St.words, children: [
      /* @__PURE__ */ n("strong", { className: St.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: St.actions, children: a })
  ] });
}
const Zs = "_root_8zmpu_2", ec = "_step_8zmpu_12", tc = "_dot_8zmpu_38", nc = "_label_8zmpu_51", _t = {
  root: Zs,
  step: ec,
  dot: tc,
  label: nc
}, ac = { done: ", done", now: ", current", next: "" };
function rc({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: _t.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${_t.dot} ward-running` : _t.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: _t.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: ac[e.state] })
  ] });
}
function UL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: _t.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(rc, { step: r, running: t }, r.label)) });
}
function Zt(e) {
  return typeof e == "number" && yt(e) ? e : null;
}
function ke(e, t) {
  const a = Zt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function In(e, t) {
  const a = Zt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const lc = "_root_13eei_3", oc = "_nav_13eei_8", ic = "_list_13eei_16", sc = "_item_13eei_24", cc = "_link_13eei_44", dc = "_sep_13eei_54", uc = "_current_13eei_58", hc = "_chips_13eei_62", De = {
  root: lc,
  nav: oc,
  list: ic,
  item: sc,
  link: cc,
  sep: dc,
  current: uc,
  chips: hc
};
function mc({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: De.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${De.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function wc({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: De.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: De.nav, children: [
    /* @__PURE__ */ n("ol", { className: De.list, children: e.map((r, l) => /* @__PURE__ */ i("li", { className: De.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(mc, { step: r, isCurrent: a && l === e.length - 1 })
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
const _c = 500;
function rr(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function lr() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, _c), e.current);
}
const Rt = 4;
function fc(e, t, a) {
  const r = Math.max(0, a - e.bottom - Rt * 2), l = Math.max(0, e.top - Rt * 2);
  return t <= r || r >= l ? { top: e.bottom + Rt, maxHeight: r } : { top: e.top - Rt - Math.min(t, l), maxHeight: l };
}
function vc(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, o = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = o[r] || !o[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function bc(e, t, a, r) {
  return { ...fc(e, t.height, a.height), left: vc(e, t.width, a.width, r) };
}
function Pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function gc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function pc(e, t, a) {
  const r = gc(t, a);
  e.style.setProperty("--ward-anchor-width", Pt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: r, box: l, view: { width: o.clientWidth, height: o.clientHeight } };
}
function yc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function ia(e, t, a, r) {
  const l = yc(e), o = pc(e, t, r), s = bc(o.edges, o.box, o.view, a);
  Object.assign(e.style, { left: Pt(s.left - o.box.left), top: Pt(s.top - o.box.top), maxHeight: Pt(s.maxHeight) }), l();
}
function Nc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function or(e, t, a = "start", r) {
  Qe(() => {
    const l = t.current, o = e.current;
    if (!l || !o) return;
    const s = Nc(l), c = () => ia(l, o, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), Qe(() => {
    t.current && e.current && ia(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const kc = "_root_dbqo8_2", $c = "_trigger_dbqo8_7", Cc = "_value_dbqo8_47", Sc = "_menu_dbqo8_65", Rc = "_find_dbqo8_87", xc = "_list_dbqo8_103", Tc = "_option_dbqo8_114", Lc = "_check_dbqo8_133", Mc = "_empty_dbqo8_144", Ne = {
  root: kc,
  trigger: $c,
  value: Cc,
  menu: Sc,
  find: Rc,
  list: xc,
  option: Tc,
  check: Lc,
  empty: Mc
}, Ac = 7;
function Ec(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function sa(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ic(e, t) {
  const [a, r] = v(e.defaultOpen === !0), [l, o] = v(""), [s, c] = v(() => sa(e.options, e.value)), d = (u) => {
    var h;
    Wa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: Ec(e.options, l),
    findable: e.options.length > Ac,
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
function Bc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Pc(e) {
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
function qc(e) {
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
const Oc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Dc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Oc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Hc({ entry: e, at: t, menu: a, ids: r, value: l }) {
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
function Fc({ menu: e, ids: t, focusRef: a }) {
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
function zc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const o = Pc(t), s = f(null);
  or(l, s);
  const c = (d) => {
    rr(d) && o(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: Ne.menu, children: [
    t.findable && /* @__PURE__ */ n(Fc, { menu: t, ids: a, focusRef: r }),
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
        onKeyDown: sr(t, qc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Hc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: Ne.empty, children: "No match" })
  ] });
}
function jc(e, t) {
  const a = e.open ? Bn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function cr(...e) {
  return e.filter(Boolean).join(" ");
}
function Wc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Kc({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
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
      ...Dc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: Ne.value, "data-placeholder": o || void 0, children: Wc(e) })
    }
  );
}
function dr(e) {
  const t = qe(), a = t ? { ...e, disabled: !0, "aria-describedby": Xt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, o = f(null), s = f(null), c = f(null), d = Ic(a, s), u = Bc(d.open, c);
  return ar(d.open, o, () => d.close(!1)), jc(d, l), /* @__PURE__ */ i("div", { ref: o, className: cr(Ne.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Kc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(zc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Gc = "_field_nytdz_2", Uc = "_label_nytdz_8", Vc = "_labelHidden_nytdz_15", Yc = "_control_nytdz_25", Jc = "_mono_nytdz_45", Qc = "_area_nytdz_50", Xc = "_invalid_nytdz_57", je = {
  field: Gc,
  label: Uc,
  labelHidden: Vc,
  control: Yc,
  mono: Jc,
  area: Qc,
  invalid: Xc
}, Zc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, ur = (e) => `${e}-label`;
function ed({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Zc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function td({ props: e, controlProps: t, cls: a }) {
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
function nd({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
function ad({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, type: "date", min: e.min, max: e.max, ...t });
}
const rd = { input: ed, select: td, textarea: nd, date: ad };
function ld(e, t, a) {
  const r = rd[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function od(e, t, a, r) {
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
function id(e) {
  const t = e.mono ? [je.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function sd(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function I(e) {
  const t = y(), a = `${t}-msg`, r = od(e, t, a, qe()), l = id(e);
  return /* @__PURE__ */ i("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: ur(t), className: sd(e.labelHidden), htmlFor: t, children: e.label }),
    ld(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const cd = "_root_1giy4_2", dd = "_trigger_1giy4_9", ud = "_ghost_1giy4_27", hd = "_panel_1giy4_46", md = "_edged_1giy4_67", wd = "_menu_1giy4_73", _d = "_group_1giy4_78", fd = "_heading_1giy4_83", vd = "_item_1giy4_89", bd = "_description_1giy4_105", gd = "_large_1giy4_109", pd = "_touch_1giy4_113", yd = "_icon_1giy4_117", Nd = "_label_1giy4_125", kd = "_text_1giy4_130", $d = "_trailing_1giy4_138", Cd = "_check_1giy4_144", Sd = "_separator_1giy4_183", Rd = "_footer_1giy4_189", xd = "_find_1giy4_196", Td = "_findGlyph_1giy4_208", Ld = "_findInput_1giy4_214", Md = "_empty_1giy4_230", L = {
  root: cd,
  trigger: dd,
  ghost: ud,
  panel: hd,
  edged: md,
  menu: wd,
  group: _d,
  heading: fd,
  item: vd,
  description: bd,
  large: gd,
  touch: pd,
  icon: yd,
  label: Nd,
  text: kd,
  trailing: $d,
  check: Cd,
  separator: Sd,
  footer: Rd,
  find: xd,
  findGlyph: Td,
  findInput: Ld,
  empty: Md
}, hr = $e(null);
function Ad(e, t) {
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
function Id(e) {
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
function Bd(e, t = {}, a = "field") {
  const { ref: r, className: l, ...o } = t;
  return { ...o, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Pn(L.trigger, a === "ghost" ? L.ghost : void 0, l) };
}
function mr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), o = Ad(e.defaultOpen === !0, l);
  return ar(o.open, r, () => o.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Pn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Bd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Id(o),
        children: e.label
      }
    ),
    o.open && /* @__PURE__ */ n(hr.Provider, { value: { ...a, popup: o, button: l }, children: e.children })
  ] });
}
function Pd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function qd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Od = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Dd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Hd(e, t) {
  return e === "separator" ? e : "items" in e ? Dd(e, t) : t(e) ? e : null;
}
function Fd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function zd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return Fd(e.map((l) => Hd(l, r)).filter((l) => l !== null));
}
const wr = (e, t) => (e % t + t) % t;
function Fe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = wr(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const jd = (e) => e.split("").every((t) => t === e[0]);
function Wd(e, t, a) {
  const r = jd(a), l = r ? a[0] : a, o = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = wr(o + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Kd(e) {
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
function Gd(e, t) {
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
function Ud(e, t, a) {
  const r = lr(), l = Gd(e, t), o = (s) => {
    if (rr(s)) {
      if (!a) return e.focus(Wd(e.items, e.current(), r(s.key)));
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
function Vd(e) {
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
function Yd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Fe(e, -1, 1) : t;
}
function Jd(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: o, focus: s } = l.current;
    a && s(a === "first" ? Yd(o) : Fe(o, o.length, -1));
  }, [a, r]);
}
function Qd({ row: e, nav: t, popup: a }) {
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
const Xd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Zd(e, t) {
  return Xd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function eu(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function tu() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ca(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    eu(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(tu, {}) : null
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
    ...Zd(t, r),
    ...Qd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...l, children: ca(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: ca(t, r) });
}
function nu({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": l, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: L.heading, children: e }),
    t.map((o) => /* @__PURE__ */ n(_r, { row: o, nav: a, popup: r }, o.at))
  ] });
}
function au({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(nu, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(_r, { row: e.row, nav: t, popup: a });
}
function ru() {
  const e = ge(hr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function lu() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function ou(e, t) {
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
function iu({ find: e, query: t, setQuery: a, input: r, nav: l, popup: o, menuId: s }) {
  const c = ou(l, o), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(lu, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function su(e, t) {
  const [a, r] = v(""), l = f(null), o = t !== void 0 && Od(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return o ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: zd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const cu = { regular: void 0, large: L.large, touch: L.touch }, du = (e, t) => Pn(L.panel, e ? L.edged : void 0, cu[t]);
function uu({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function fr({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: o = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = ru(), h = f(null);
  or(u, h, a, l);
  const m = su(e, r), _ = Pd(m.entries), N = Kd(_.flatMap(qd).map((O) => O.item)), k = Ud(N, s, m.toFind), M = Vd(s);
  return Jd(N, s), /* @__PURE__ */ i("div", { ref: h, className: du(l, o), ...M, children: [
    m.find && /* @__PURE__ */ n(iu, { find: m.find, query: m.query, setQuery: m.setQuery, input: m.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: _.map((O, we) => /* @__PURE__ */ n(au, { block: O, nav: N, popup: s }, we)) }),
    /* @__PURE__ */ n(uu, { find: m.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function hu(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function vr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !hu(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const mu = (e, t) => e.reduce((a, r) => a + r + t, -t);
function wu({ room: e, widths: t, more: a, gap: r }, l) {
  const o = t.map((d, u) => u);
  if (mu(t, r) <= e) return o;
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
function _u(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - on(a.paddingInlineStart) - on(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), da),
    more: r ? da(r) : 0,
    gap: on(a.columnGap)
  };
}
function fu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const vu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function br(e, t, a, r = ':scope > [role="tab"]') {
  const [l, o] = v(null);
  return Qe(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = _u(s, r);
      o((u) => vu(u, d) ? u : d);
    };
    return c(), fu(s, c);
  }, [e, a, r]), l && wu(l, t);
}
const bu = "_strip_1pizx_2", gu = "_fits_1pizx_19", pu = "_probe_1pizx_27", yu = "_moreRoot_1pizx_36", Nu = "_more_1pizx_36", ku = "_tab_1pizx_55", $u = "_count_1pizx_91", Cu = "_badge_1pizx_97", U = {
  strip: bu,
  fits: gu,
  probe: pu,
  moreRoot: yu,
  more: Nu,
  tab: ku,
  count: $u,
  badge: Cu
}, gr = "More";
function Su(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const ua = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, qn = (e) => e.badge === void 0 ? ua(e) : `${ua(e)}, ${e.badge}`;
function pr(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const Ru = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function xu({ tab: e, active: t, place: a, onChange: r }) {
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
function Tu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((o) => o.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Lu({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(mr, { label: gr, className: U.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ n(fr, { align: "end", entries: e.map((r) => ({ label: qn(r), onSelect: () => a(r.id) })) }) });
}
function Mu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Ru;
}
function VL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const o = Jt({ orientation: "horizontal" }), s = Su(e, t);
  S(() => o.setActive(s), [o.setActive, s]);
  const c = f(null);
  vr(c, l);
  const d = br(c, s, e.map(qn).join(`
`)), u = d ? e.filter((h, m) => !d.includes(m)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${pr(l)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...o.containerProps, children: [
    e.map((h, m) => /* @__PURE__ */ n(xu, { tab: h, active: t, place: Mu(o, d, m), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: gr }),
    u.length > 0 && /* @__PURE__ */ n(Lu, { tabs: u, trigger: o.itemProps(e.length), onPick: Tu(c, a) })
  ] });
}
const ha = 7, yr = "More", Au = ":scope > a", Nr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Eu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Iu(e, t) {
  return !e || e.includes(t) ? {} : Eu;
}
function Bu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Pu({ links: e }) {
  return /* @__PURE__ */ n(mr, { label: yr, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ n(fr, { align: "end", entries: e.map((t) => ({ label: Nr(t), href: t.href })) }) });
}
function YL({ links: e, active: t, label: a, level: r }) {
  if (e.length > ha) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ha} — the set is fixed`);
  const l = f(null);
  vr(l, r);
  const o = Math.max(0, e.findIndex((d) => d.id === t)), s = br(l, o, e.map(Nr).join(`
`), Au), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: l, className: `${pr(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Bu, { link: d, current: d.id === t, place: Iu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: yr }),
    c.length > 0 && /* @__PURE__ */ n(Pu, { links: c })
  ] });
}
const qu = "_root_jws4d_3", Ou = "_segment_jws4d_9", ma = {
  root: qu,
  segment: Ou
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
const Du = "_sidebar_s9o1j_3", Hu = "_brand_s9o1j_9", Fu = "_mark_s9o1j_17", zu = "_word_s9o1j_24", ju = "_nav_s9o1j_30", Wu = "_navItem_s9o1j_39", Ku = "_footLink_s9o1j_49", Gu = "_group_s9o1j_58", Uu = "_groupName_s9o1j_65", Vu = "_agents_s9o1j_81", Yu = "_agent_s9o1j_81", Ju = "_root_s9o1j_96", Qu = "_agentTop_s9o1j_105", Xu = "_dot_s9o1j_112", Zu = "_agentName_s9o1j_124", eh = "_agentMeta_s9o1j_138", th = "_foot_s9o1j_49", nh = "_footName_s9o1j_150", ah = "_footLinks_s9o1j_157", rh = "_linkBrand_s9o1j_184", lh = "_label_s9o1j_205", oh = "_note_s9o1j_210", ih = "_footer_s9o1j_226", E = {
  sidebar: Du,
  brand: Hu,
  mark: Fu,
  word: zu,
  nav: ju,
  navItem: Wu,
  new: "_new_s9o1j_48",
  footLink: Ku,
  group: Gu,
  groupName: Uu,
  agents: Vu,
  agent: Yu,
  root: Ju,
  agentTop: Qu,
  dot: Xu,
  agentName: Zu,
  agentMeta: eh,
  foot: th,
  footName: nh,
  footLinks: ah,
  linkBrand: rh,
  label: lh,
  note: oh,
  footer: ih
};
function sh({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: E.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: E.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: E.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ch({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function dh({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: o }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: E.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: E.brand, children: [
      /* @__PURE__ */ n("span", { className: E.mark }),
      /* @__PURE__ */ n("span", { className: E.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: E.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: E.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: E.group, children: [
      /* @__PURE__ */ i("span", { className: E.groupName, children: [
        a,
        " · ",
        ne(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: E.new, href: T(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n(sh, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ch, { shared: o })
  ] });
}
function uh(e) {
  return e.destinations ?? e.items ?? [];
}
function hh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function mh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function wh({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function _h(e) {
  return /* @__PURE__ */ i("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(hh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: uh(e).map((t) => /* @__PURE__ */ n(wh, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(mh, { children: e.children })
  ] });
}
function fh(e) {
  return "agents" in e;
}
function JL(e) {
  return fh(e) ? /* @__PURE__ */ n(dh, { ...e }) : /* @__PURE__ */ n(_h, { ...e });
}
const vh = "_mark_wlgi8_3", bh = {
  mark: vh
}, gh = { met: "✓", unmet: "", failed: "✕" };
function On({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: bh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: gh[e]
    }
  );
}
const ph = "_avatar_1t33a_3", yh = {
  avatar: ph
};
function Ft(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Nh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ft(e), ...[...t.slice(1)].map((r) => a + r)];
}
function kh(e, t) {
  const a = Nh(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ft(e).charAt(0) + String(r)); ) r += 1;
  return Ft(e).charAt(0) + String(r);
}
function QL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = kh(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function $h(e) {
  return e != null && yt(e) ? Yl(e) : void 0;
}
function XL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: yh.avatar, "data-size": a, "aria-hidden": "true", style: $h(t), children: r ?? Ft(e) });
}
const Ch = "_marker_br9fi_2", Sh = {
  marker: Ch
}, Rh = {
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
}, xh = { running: " ward-running" };
function Ke({ size: e, kind: t, label: a }) {
  const r = { "--marker": Rh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Sh.marker} ward-marker ward-marker--${t}${xh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Th = "_root_ti0pq_2", Lh = "_chip_ti0pq_11", Mh = "_noCase_ti0pq_23", xt = {
  root: Th,
  chip: Lh,
  noCase: Mh
};
function Ah(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Dn({ connection: e, since: t, lastEventAt: a }) {
  const r = Ah(t, a), l = Mn(r, e === "reconnecting");
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
const Eh = "_root_19rl8_2", Ih = "_context_19rl8_13", Bh = "_row_19rl8_1", Ph = "_heading_19rl8_27", qh = "_headingWrap_19rl8_35", Oh = "_meta_19rl8_41", Dh = "_chips_19rl8_49", Hh = "_title_19rl8_56", Fh = "_consequence_19rl8_66", zh = "_actionsWrap_19rl8_73", jh = "_actions_19rl8_73", Wh = "_action_19rl8_73", Kh = "_overflowPanel_19rl8_102", Gh = "_measureClip_19rl8_113", Uh = "_measure_19rl8_113", G = {
  root: Eh,
  context: Ih,
  row: Bh,
  heading: Ph,
  headingWrap: qh,
  meta: Oh,
  chips: Dh,
  title: Hh,
  consequence: Fh,
  actionsWrap: zh,
  actions: jh,
  action: Wh,
  overflowPanel: Kh,
  measureClip: Gh,
  measure: Uh
};
function Vh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(st, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ n("h1", { className: G.title, children: e });
}
function Yh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: G.chips, children: e.map((t) => /* @__PURE__ */ n(w, { ...t }, t.label)) }) : null;
}
function Jh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: G.consequence, title: t, children: e }) : null;
}
function Qh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ n(Yh, { chips: e }),
    /* @__PURE__ */ n(Jh, { consequence: t, consequenceHint: a })
  ] });
}
function Xh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ n(Vh, { title: e, density: l }),
    /* @__PURE__ */ n(Qh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function gn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: G.action, "data-action": "", children: t }, a));
}
function wa({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Zh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(wa, { disclosure: l }) : t ? [/* @__PURE__ */ n(wa, { disclosure: l }, "more"), /* @__PURE__ */ n(gn, { actions: e }, "actions")] : /* @__PURE__ */ n(gn, { actions: e });
}
function em(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function tm({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(gn, { actions: e }) });
}
function nm(e, t) {
  const a = y(), [r, l] = v(!1), o = r && e;
  return { disclosure: { open: o, panelId: a, toggle: () => l(!o) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const am = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function rm(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && am(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function lm({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: G.context, children: /* @__PURE__ */ n(wc, { path: e.path, current: e.current }) });
}
function om(...e) {
  return e.some((t) => t === null);
}
function im(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function $r(e) {
  return getComputedStyle(e).flexDirection === "column";
}
function sm(e, t) {
  return $r(e) ? 0 : t.offsetWidth + im(e);
}
function cm(e, t) {
  return !$r(e) && t.scrollWidth > t.clientWidth + 1;
}
function dm(e, t, a, r, l) {
  if (l === 0 || om(t, a, r)) return !1;
  if (e.clientWidth === 0) return null;
  const [o, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - sm(e, o));
  return c.offsetWidth > d || cm(e, s);
}
function um(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function hm(e) {
  return Tl(e) && (e.type === "a" || typeof e.props.href == "string");
}
function mm(e, t) {
  return t.length === 0 && e.length === 1 && hm(e[0]);
}
function wm(e, t) {
  const a = f(null), r = f(null), l = f(null), o = f(null), [s, c] = v(!1);
  return S(() => {
    const d = a.current;
    if (!um(d)) return;
    const u = () => {
      const m = dm(d, r.current, l.current, o.current, e);
      m !== null && c(m);
    }, h = new ResizeObserver(u);
    return h.observe(d), o.current && h.observe(o.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: o, collapsed: s && !t };
}
function _m({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function fm({ connection: e }) {
  return e ? /* @__PURE__ */ n(Dn, { connection: e.connection, since: e.since }) : null;
}
function ZL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: o, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: m, headingRef: _, actionsRef: N, measureRef: k, collapsed: M } = wm(s.length, mm(s, c)), O = c.length > 0, { disclosure: we, close: ae } = nm(M || O, N), Ce = em(c, s, M, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ n(lm, { crumb: rm(e, r, t) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: _, className: G.headingWrap, children: /* @__PURE__ */ n(Xh, { title: r, chips: a, consequence: l, consequenceHint: o, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ n(fm, { connection: d }),
        /* @__PURE__ */ n("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Zh, { actions: s, hasMore: O, collapsed: M, onOverflow: u, disclosure: we }) })
      ] })
    ] }),
    /* @__PURE__ */ n(tm, { actions: Ce, disclosure: we, onEscape: ae }),
    /* @__PURE__ */ n(_m, { actions: s, hasMore: O, measureRef: k })
  ] });
}
const vm = "_root_td96x_2", bm = "_body_td96x_16", _a = {
  root: vm,
  body: bm
};
function e3({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${_a.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: _a.body, children: a }) });
}
const gm = "_tip_1bmx3_2", pm = "_bubble_1bmx3_1", fa = {
  tip: gm,
  bubble: pm
}, ht = 16;
function ym(e, t, a) {
  return e < ht ? ht - e : t > a - ht ? Math.max(a - ht - t, ht - e) : 0;
}
function Nm(e) {
  const t = f(null), [a, r] = v(0);
  return Qe(() => {
    const l = t.current;
    if (!e || l === null) {
      r(0);
      return;
    }
    const o = l.getBoundingClientRect();
    r((s) => s + ym(o.left, o.right, window.innerWidth));
  }, [e]), { bubble: t, style: { "--ward-tip-shift": `${a}px` } };
}
function t3({ label: e, text: t, align: a = "center" }) {
  const r = y(), [l, o] = v(!1), s = Nm(l), c = (h) => {
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
const km = "_row_zzkv3_3", $m = {
  row: km
}, Hn = "custom", Cm = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: Hn, label: "Custom range" }
], Sm = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, Rm = (e) => e.from !== "" && e.to !== "" && e.from > e.to, va = { from: "", to: "" }, xm = (e, t) => t === null && "preset" in e ? e.preset : Hn;
function Tm({ range: e, today: t, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(I, { kind: "date", label: "From", value: e.from, max: e.to || t, onChange: a("from"), invalid: Rm(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ n(I, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: t, onChange: a("to") })
  ] });
}
function n3({ value: e, onChange: t, today: a }) {
  const [r, l] = v("from" in e ? e : null), o = (c) => {
    if (c === Hn) return l(r ?? va);
    l(null), t({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? va, [c]: d };
    l(u), Sm(u) && t(u);
  };
  return /* @__PURE__ */ i("div", { className: `${$m.row} ward-period`, children: [
    /* @__PURE__ */ n(I, { kind: "select", label: "Period", value: xm(e, r), options: Cm, onChange: o }),
    r === null ? null : /* @__PURE__ */ n(Tm, { range: r, today: a, setEnd: s })
  ] });
}
const Lm = "_root_bf1pc_2", Mm = "_table_bf1pc_9", Am = "_caption_bf1pc_14", Em = "_series_bf1pc_23", Im = "_category_bf1pc_31", Bm = "_cell_bf1pc_39", Pm = "_track_bf1pc_45", qm = "_lane_bf1pc_52", Om = "_bar_bf1pc_56", Dm = "_value_bf1pc_63", Hm = "_swatch_bf1pc_70", Fm = "_empty_bf1pc_78", Q = {
  root: Lm,
  table: Mm,
  caption: Am,
  series: Em,
  category: Im,
  cell: Bm,
  track: Pm,
  lane: qm,
  bar: Om,
  value: Dm,
  swatch: Hm,
  empty: Fm
}, zm = "—", ba = 6;
function jm(e, t) {
  if (t.length < 1 || t.length > ba)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${ba}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Wm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Cr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Km(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Gm({ value: e, top: t, step: a, format: r, missing: l }) {
  const o = Km(e, t), s = { "--share": `${o}%` };
  return /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ i("span", { className: Q.track, children: [
    /* @__PURE__ */ n("span", { className: Q.lane, children: o > 0 ? /* @__PURE__ */ n("span", { className: `${Q.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Q.value, children: e === null ? l : r(e) })
  ] }) });
}
function Um({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Q.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Q.swatch, "data-step": Cr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Vm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Q.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Q.empty, children: t })
  ] });
}
function Ym({ title: e, categories: t, series: a, top: r, format: l = ne, categoryHead: o = "Category", missing: s = zm }) {
  return /* @__PURE__ */ n("div", { className: `${Q.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Q.table, children: [
    /* @__PURE__ */ n("caption", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Q.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ n(Um, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Q.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Gm, { value: u.values[d], top: r, step: Cr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function a3(e) {
  jm(e.categories, e.series);
  const t = Wm(e.series);
  return t === 0 ? /* @__PURE__ */ n(Vm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Ym, { ...e, top: t });
}
const Jm = "_root_1bfqw_2", Qm = "_figure_1bfqw_7", Xm = "_of_1bfqw_13", Zm = "_bar_1bfqw_18", ew = "_rows_1bfqw_38", tw = "_row_1bfqw_38", nw = "_label_1bfqw_49", aw = "_amount_1bfqw_54", Oe = {
  root: Jm,
  figure: Qm,
  of: Xm,
  bar: Zm,
  rows: ew,
  row: tw,
  label: nw,
  amount: aw
};
function rw({ spent: e, ceiling: t, breakdown: a }) {
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
const lw = "_frame_f7bxz_2", ow = "_table_f7bxz_6", iw = "_th_f7bxz_12", sw = "_td_f7bxz_13", cw = "_sort_f7bxz_53", dw = "_row_f7bxz_65", uw = "_empty_f7bxz_73", ze = {
  frame: lw,
  table: ow,
  th: iw,
  td: sw,
  sort: cw,
  row: dw,
  empty: uw
}, hw = { asc: "ascending", desc: "descending" };
function mw(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return hw[t.direction];
}
function ww(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: ze.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function _w(e) {
  return e === void 0 ? void 0 : { width: e };
}
function fw({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ze.th,
      style: _w(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": mw(e, t),
      children: ww(e, a)
    }
  );
}
function vw({ row: e, props: t }) {
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
function bw({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ze.head, children: t.map((m) => /* @__PURE__ */ n(fw, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((m) => /* @__PURE__ */ n(vw, { row: m, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: o, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(m))) })
  ] }) });
}
const gw = "_list_v0s52_2", pw = {
  list: gw
};
function yw({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: pw.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Nw = "_label_1u62a_2", kw = {
  label: Nw
};
function r3({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: kw.label, children: t.header }) }, t.key)) }) });
}
const $w = "_stack_bp6a0_2", Cw = {
  stack: $w
};
function l3({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Cw.stack, "data-ward-action-stack": "", children: e });
}
const Sw = "_set_1z0sq_2", Rw = "_legend_1z0sq_7", xw = "_row_1z0sq_15", Tw = "_control_1z0sq_20", Lw = "_input_1z0sq_26", Mw = "_label_1z0sq_31", Aw = "_consequence_1z0sq_36", Ue = {
  set: Sw,
  legend: Rw,
  row: xw,
  control: Tw,
  input: Lw,
  label: Mw,
  consequence: Aw
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
const Ew = "_root_11gpw_2", Iw = "_head_11gpw_10", Bw = "_note_11gpw_29", Pw = "_index_11gpw_34", qw = "_dot_11gpw_38", Ow = "_counter_11gpw_49", Dw = "_trailing_11gpw_57", Ye = {
  root: Ew,
  head: Iw,
  note: Bw,
  index: Pw,
  dot: qw,
  counter: Ow,
  trailing: Dw
};
function Hw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ye.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ye.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Fw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ye.counter, "aria-hidden": "true", children: e }) : null;
}
function ga({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: o }) {
  return /* @__PURE__ */ i("div", { className: `${Ye.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ i("h2", { className: Ye.head, children: [
      /* @__PURE__ */ n(Hw, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ye.note, children: a }),
    /* @__PURE__ */ n(Fw, { counter: r }),
    o === void 0 ? null : /* @__PURE__ */ n("span", { className: Ye.trailing, children: o })
  ] });
}
const zw = "_strip_c3x3u_2", jw = "_cell_c3x3u_7", Ww = "_value_c3x3u_12", Kw = "_link_c3x3u_29", Gw = "_label_c3x3u_49", Uw = "_tiles_c3x3u_101", We = {
  strip: zw,
  cell: jw,
  value: Ww,
  link: Kw,
  label: Gw,
  tiles: Uw
};
function Rr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const xr = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Vw({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: xr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function Yw({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: xr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${We.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Tr = (e) => e.href === void 0 ? /* @__PURE__ */ n(Vw, { cell: e }, e.label) : /* @__PURE__ */ n(Yw, { cell: e, href: e.href }, e.label);
function en({ cells: e, divided: t = !1 }) {
  return Rr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Tr) });
}
const pa = 6;
function o3({ cells: e }) {
  Rr("StatTiles", e, [1, 2 * pa]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, pa) };
  return /* @__PURE__ */ n("dl", { className: `${We.tiles} ward-stattiles`, style: t, children: e.map(Tr) });
}
const Jw = "_root_1eb1u_2", Qw = "_track_1eb1u_8", Xw = "_thumb_1eb1u_46", Zw = "_labelHidden_1eb1u_64", e_ = "_label_1eb1u_64", it = {
  root: Jw,
  track: Qw,
  thumb: Xw,
  labelHidden: Zw,
  label: e_
};
function t_(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function n_(e) {
  return e ? `${it.label} ${it.labelHidden}` : it.label;
}
function a_(e, t, a) {
  return e && !t && a ? a : void 0;
}
function r_(e, t, a, r) {
  return { "aria-describedby": Xt(dt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function l_({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Xe({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: o, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, m = qe(), { on: _, off: N } = t_(t, r, l, m !== null), k = a_(N, m !== null, c);
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
        ...r_(h, o, m, k),
        className: `${it.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: it.thumb })
      }
    ),
    /* @__PURE__ */ n("label", { id: d, htmlFor: u, className: n_(s), children: e }),
    /* @__PURE__ */ n(l_, { id: h, reason: k })
  ] });
}
const o_ = "_bar_1vp69_2", i_ = "_skip_1vp69_11", s_ = "_mark_1vp69_22", c_ = "_nav_1vp69_30", d_ = "_list_1vp69_34", u_ = "_select_1vp69_41", h_ = "_selectTrigger_1vp69_45", m_ = "_dest_1vp69_52", w_ = "_actor_1vp69_71", __ = "_actorMark_1vp69_84", f_ = "_actorLabel_1vp69_89", v_ = "_tagline_1vp69_108", ce = {
  bar: o_,
  skip: i_,
  mark: s_,
  nav: c_,
  list: d_,
  select: u_,
  selectTrigger: h_,
  dest: m_,
  actor: w_,
  actorMark: __,
  actorLabel: f_,
  tagline: v_
};
function b_(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function g_(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function i3({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: o, skipTo: s = "main" }) {
  const c = g_(r);
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
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: b_(c) })
    ] })
  ] });
}
const p_ = "_tree_zzoob_2", y_ = "_item_zzoob_6", N_ = "_row_zzoob_10", k_ = "_button_zzoob_22", zt = {
  tree: p_,
  item: y_,
  row: N_,
  button: k_
}, Lr = $e(null);
function $_({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Jt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Lr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: zt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const C_ = { ArrowRight: !0, ArrowLeft: !1 };
function ya(e) {
  return e ? !0 : void 0;
}
function S_(e, t) {
  const a = C_[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function R_(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function x_(e) {
  const t = [zt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function T_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function L_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function M_(e) {
  return typeof e == "string" ? e : void 0;
}
function A_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function E_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Mr(e) {
  const t = ge(Lr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = T_(e);
  return /* @__PURE__ */ i("li", { className: zt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: x_(e),
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
            onClick: () => R_(e),
            onKeyDown: (r) => S_(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: L_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: M_(e.label), children: e.label }),
              /* @__PURE__ */ n(A_, { value: e.detail }),
              /* @__PURE__ */ n(E_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const I_ = "_frame_gxspk_2", B_ = "_subjectRail_gxspk_22", P_ = "_subject_gxspk_22", q_ = "_rail_gxspk_42", O_ = "_record_gxspk_57", D_ = "_recordBody_gxspk_102", H_ = "_stageGrid_gxspk_157", F_ = "_band_gxspk_171", z_ = "_bandBody_gxspk_179", j_ = "_bandActions_gxspk_184", W_ = "_scroller_gxspk_192", K_ = "_board_gxspk_219", G_ = "_lanes_gxspk_228", U_ = "_cardGrid_gxspk_262", X = {
  frame: I_,
  subjectRail: B_,
  subject: P_,
  rail: q_,
  record: O_,
  recordBody: D_,
  stageGrid: H_,
  band: F_,
  bandBody: z_,
  bandActions: j_,
  scroller: W_,
  board: K_,
  lanes: G_,
  cardGrid: U_
};
function s3({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: X.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Na(e) {
  return e ? "true" : void 0;
}
function c3({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: o }) {
  return /* @__PURE__ */ i("div", { className: X.subjectRail, "data-ward-subject-rail": a, "data-ruled": Na(o), children: [
    /* @__PURE__ */ n("div", { className: X.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: X.rail, "data-sticky": Na(l), "aria-label": r, children: t })
  ] });
}
function d3({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: o, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: X.record, "aria-label": o, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ga, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: X.record, "aria-label": o, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ga, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const V_ = "_form_1j8ub_2", Y_ = "_fields_1j8ub_9", J_ = "_actions_1j8ub_19", sn = {
  form: V_,
  fields: Y_,
  actions: J_
};
function u3({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (o) => {
    o.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: sn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: sn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: sn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function h3({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: X.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: X.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: X.bandActions, children: t })
  ] });
}
const Q_ = "(max-width: 767.98px)";
function Fn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(En, { className: X.scroller, label: e, count: a ?? ja.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function X_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = v(null), o = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(I, { kind: "select", label: a, value: (o == null ? void 0 : o.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Fn, { label: t, children: o == null ? void 0 : o.content })
  ] });
}
function Z_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ n(Fn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(za, { children: a.content }, a.id)) }) });
}
function m3({ children: e, label: t = "Board", lanes: a, laneLabel: r = "Column" }) {
  const l = gt(Q_);
  return a === void 0 ? /* @__PURE__ */ n(Fn, { label: t, children: e }) : l ? /* @__PURE__ */ n(X_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Z_, { lanes: a, label: t });
}
function w3({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), o = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(En, { className: X.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: o, children: t });
}
function _3({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${X.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const ef = "_block_6tv5x_3", tf = "_sentence_6tv5x_10", nf = "_meta_6tv5x_19", af = "_ways_6tv5x_24", rf = "_action_6tv5x_38", lf = "_strip_6tv5x_42", of = "_loading_6tv5x_61", sf = "_label_6tv5x_69", cf = "_counter_6tv5x_76", be = {
  block: ef,
  sentence: tf,
  meta: nf,
  ways: af,
  action: rf,
  strip: lf,
  loading: of,
  label: sf,
  counter: cf
};
function df({ action: e }) {
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
    /* @__PURE__ */ n(df, { action: t })
  ] });
}
function uf(e) {
  return /* @__PURE__ */ n(tn, { ...e, kind: "ward-emptystate" });
}
function f3({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(tn, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function hf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${be.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function v3({ ways: e, ...t }) {
  return /* @__PURE__ */ n(tn, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(hf, { ways: e }) });
}
function b3({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(tn, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "failed at ",
    me(t)
  ] }) });
}
function g3({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(t)
  ] });
}
function p3({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(t)
  ] });
}
function y3({ label: e, startedAt: t }) {
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
const mf = "_note_cigdt_2", wf = {
  note: mf
};
function _f({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: wf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const ff = "_card_k7btg_3", vf = "_hit_k7btg_31", bf = "_head_k7btg_44", gf = "_title_k7btg_51", pf = "_meta_k7btg_57", yf = "_since_k7btg_66", Nf = "_sep_k7btg_76", kf = "_fields_k7btg_80", $f = "_field_k7btg_80", Cf = "_last_k7btg_98", Sf = "_reason_k7btg_110", he = {
  card: ff,
  hit: vf,
  head: bf,
  title: gf,
  meta: pf,
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
function xf(e, t, a) {
  const r = Bt(e, "blue"), l = Bt(e, "orange"), o = Bt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: o };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Rf[d.type];
      u && c[u]();
    });
  }, [r, a, o, t, l]);
}
const Tf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Lf(e, t) {
  return Tf[t](e);
}
function Mf({ item: e, connection: t }) {
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
function Af({ item: e }) {
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
function If({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: he.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: he.field, children: Lf(e, a) }, a)) });
}
const pn = (e) => e ? !0 : void 0;
function Bf(e) {
  return { "--stream": ke(e.streamStep, "id") };
}
function Pf(e, t, a) {
  e == null || e(t, a);
}
function qf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Of({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: he.last, "data-stale": pn(t), children: a }) : null;
}
function nn(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  xf(r, a.key, e.feed);
  const l = qf(e.feed), o = Bf(a);
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
        /* @__PURE__ */ n("button", { type: "button", className: he.hit, onClick: (s) => Pf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Af, { item: a }),
        /* @__PURE__ */ n(st, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ n(Mf, { item: a, connection: l }),
        /* @__PURE__ */ n(Ef, { reason: a.blockedReason }),
        /* @__PURE__ */ n(If, { item: a, fields: t }),
        /* @__PURE__ */ n(Of, { item: a, stale: l === "stale" })
      ]
    }
  );
}
function kt(e, t) {
  return e.trim().toLowerCase() === t.toLowerCase();
}
const Df = "_column_1j8bi_3", Hf = "_head_1j8bi_21", Ff = "_label_1j8bi_30", zf = "_count_1j8bi_39", jf = "_list_1j8bi_53", vt = {
  column: Df,
  head: Hf,
  label: Ff,
  count: zf,
  list: jf
};
function Ar(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Wf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: vt.head, children: [
    /* @__PURE__ */ n("h2", { className: vt.label, id: a, title: e.label, children: e.label }),
    e.gate && !kt(e.label, "Review") && /* @__PURE__ */ n(w, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: vt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Kf(e) {
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
function Gf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, m = Ar(t, r);
  return /* @__PURE__ */ i("section", { className: vt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Wf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Kf, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, rows: m }),
    h && /* @__PURE__ */ n(_f, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Uf = "_foot_cs4jr_2", Vf = "_note_cs4jr_13", Yf = "_link_cs4jr_19", cn = {
  foot: Uf,
  note: Vf,
  link: Yf
};
function N3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: cn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: cn.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${cn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const Jf = "_head_1tfi5_3", Qf = "_identity_1tfi5_12", Xf = "_titleRow_1tfi5_18", Zf = "_title_1tfi5_18", ev = "_key_1tfi5_35", tv = "_rollup_1tfi5_45", nv = "_tools_1tfi5_53", av = "_swatch_1tfi5_101", rv = "_mark_1tfi5_108", Te = {
  head: Jf,
  identity: Qf,
  titleRow: Xf,
  title: Zf,
  key: ev,
  rollup: tv,
  tools: nv,
  swatch: av,
  mark: rv
}, ka = "initials:";
function lv(e) {
  return e === void 0 ? "done this week unknown" : `${ne(e)} done this week`;
}
function ov(e) {
  const t = [lv(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ne(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${se(e.p90)}`), t.join(" · ");
}
function iv(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ne(e.inFlight),
      " open"
    ] }),
    " · ",
    ov(e)
  ] });
}
function sv(e) {
  return e.startsWith(ka) ? e.slice(ka.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function cv({ markRef: e, streamStep: t }) {
  const a = { "--stream": ke(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Te.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: sv(e) }) : /* @__PURE__ */ n("span", { className: Te.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function dv({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function k3({
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
        /* @__PURE__ */ n(cv, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Te.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Te.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Te.rollup, "aria-live": "polite", children: iv(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Te.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(dv, { owners: l, owner: o, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Dn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const uv = "_head_1sejb_14", hv = "_line_1sejb_15", mv = "_cHandle_1sejb_36", wv = "_cName_1sejb_41", _v = "_nameLine_1sejb_49", fv = "_cLabel_1sejb_56", vv = "_cCap_1sejb_61", bv = "_cShown_1sejb_66", gv = "_name_1sejb_49", pv = "_noCap_1sejb_88", yv = "_state_1sejb_102", Nv = "_handle_1sejb_111", H = {
  head: uv,
  line: hv,
  cHandle: mv,
  cName: wv,
  nameLine: _v,
  cLabel: fv,
  cCap: vv,
  cShown: bv,
  name: gv,
  noCap: pv,
  state: yv,
  handle: Nv
}, kv = "Review stages always show.", $v = "Done stages are counted, not shown.";
function $3() {
  return /* @__PURE__ */ i("div", { className: H.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.cHandle }),
    /* @__PURE__ */ n("span", { className: H.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: H.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: H.cShown, children: "Shown" })
  ] });
}
function Cv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Sv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function Rv({ stage: e }) {
  return /* @__PURE__ */ n("span", { className: H.cName, children: /* @__PURE__ */ i("span", { className: H.nameLine, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    e.gate && !kt(e.name, "Review") && /* @__PURE__ */ n(w, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function xv(e) {
  return e === void 0 ? "" : String(e);
}
function Tv(e) {
  return e === "" ? void 0 : Number(e);
}
function Lv({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && Sv(r, t),
      children: "⠿"
    }
  ) });
}
function Mv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${H.cCap} ${H.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: H.cCap, children: /* @__PURE__ */ n(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: xv(t.cap), onChange: (r) => a({ ...t, cap: Tv(r) }) }) });
}
function Av(e) {
  return e.gate ? kv : e.terminal ? $v : void 0;
}
function Ev({ stage: e, config: t, onChange: a }) {
  const r = qe() !== null, l = Cv(e, t.shown), o = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: H.cShown, children: [
    /* @__PURE__ */ n(Xe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: Av(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: H.state, "data-fixed": o || void 0, "aria-hidden": "true", onClick: () => !o && s(!l.shown), children: l.state })
  ] });
}
function Iv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function C3({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: H.line, "data-kind": Iv(e), children: [
    /* @__PURE__ */ n(Lv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Rv, { stage: e }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: /* @__PURE__ */ n(I, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(Mv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Ev, { stage: e, config: t, onChange: a })
  ] });
}
const Bv = "_body_8qsv9_2", Pv = "_head_8qsv9_9", qv = "_summary_8qsv9_19", Ov = "_block_8qsv9_20", Dv = "_actionsBlock_8qsv9_21", Hv = "_title_8qsv9_41", Fv = "_note_8qsv9_46", zv = "_k_8qsv9_51", jv = "_kv_8qsv9_58", Wv = "_row_8qsv9_64", Kv = "_label_8qsv9_75", Gv = "_value_8qsv9_84", Uv = "_quote_8qsv9_90", Vv = "_actions_8qsv9_21", Yv = "_resolve_8qsv9_111", j = {
  body: Bv,
  head: Pv,
  summary: qv,
  block: Ov,
  actionsBlock: Dv,
  title: Hv,
  note: Fv,
  k: zv,
  kv: jv,
  row: Wv,
  label: Kv,
  value: Gv,
  quote: Uv,
  actions: Vv,
  resolve: Yv
};
function Jv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Qv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Xv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Zv(e, t, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Jv(e),
    ...Xv(a),
    ...Qv(e, t)
  ];
}
function eb({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: j.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: j.k, children: t }),
    e
  ] });
}
function tb(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function nb({ item: e, showKey: t }) {
  const a = tb(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: j.head, children: [
    t && /* @__PURE__ */ n(w, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(w, { role: a.role, label: a.label })
  ] });
}
function ab({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: j.block, children: [
    /* @__PURE__ */ n("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function S3({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: o, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), m = Zv(e, l, d);
  return /* @__PURE__ */ n(ut, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: j.body, children: [
    /* @__PURE__ */ n(nb, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: j.summary, children: [
      /* @__PURE__ */ n("h2", { className: j.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: j.kv, children: m.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: j.row, children: [
      /* @__PURE__ */ n("dt", { className: j.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: j.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(ab, { item: e }),
    /* @__PURE__ */ i("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: j.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ n(eb, { resolve: o, label: s ?? "Next steps" })
  ] }) });
}
const rb = "_root_3azmy_2", lb = "_list_3azmy_7", ob = "_item_3azmy_12", ib = "_box_3azmy_18", sb = "_text_3azmy_23", cb = "_note_3azmy_28", et = {
  root: rb,
  list: lb,
  item: ob,
  box: ib,
  text: sb,
  note: cb
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
const db = "_rail_znbbp_2", ub = "_k_znbbp_11", hb = "_head_znbbp_19", mb = "_section_znbbp_25", wb = "_card_znbbp_39", _b = "_strip_znbbp_46", fb = "_skeleton_znbbp_60", vb = "_skeletonLabel_znbbp_74", bb = "_bar_znbbp_80", gb = "_note_znbbp_89", de = {
  rail: db,
  k: ub,
  head: hb,
  section: mb,
  card: wb,
  strip: _b,
  skeleton: fb,
  skeletonLabel: vb,
  bar: bb,
  note: gb
};
function pb(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Er({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    t
  ] });
}
function yb({ effects: e }) {
  const t = e.filter((a) => !a.met);
  return t.length === 0 ? null : /* @__PURE__ */ n(Er, { title: "Warnings", children: /* @__PURE__ */ n(an, { items: t, density: "compact" }) });
}
function Nb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function kb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Gf, { column: l, items: t.filter((o) => o.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function $b(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(kb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Nb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function R3(e) {
  const t = pb(e.onOpen), a = Ar(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ n("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: a && /* @__PURE__ */ n(nn, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Er, { title: "Columns", children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n($b, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(yb, { effects: e.effects })
  ] });
}
function Cb(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Sb(e) {
  return Math.ceil(e.length / 2);
}
function Rb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ir(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function xb(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = Ir(e);
  l !== void 0 && a(l), r(Rb(e.type));
}
function Tb(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (o) => xb(o, a, r, l));
  }, [e, t, a, r, l]);
}
function Lb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Mb(e, t) {
  return t ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Ab(e, t) {
  return t !== void 0 ? se(e.timeInStage) + " · waits on " + t.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Eb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + P.height.card + " + " + P.height.cardRow + " * " + String(Sb(t ?? [])) + ")"
  };
}
function Ib(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Bb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(w, { role: "meta", label: le(e.cost) }) : null;
}
function Pb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(w, { role: "meta", label: e.jiraKey }) : null;
}
function qb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Ob(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Db(e, t) {
  return t === void 0 ? e : Cb(e, t.ref);
}
function Hb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function pt(e) {
  return e === !0 ? "true" : void 0;
}
function Br(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), o = Bt(l), s = f(/* @__PURE__ */ new Set()), [c, d] = v(Lb(t));
  Tb(e.feed, t.key, s, d, o);
  const u = Mb(t, r), h = Ab(t, a), m = Eb(t, e.fields), _ = Ob(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Hb(e),
      className: "ward-workcard",
      "data-flagged": pt(t.flagged),
      "data-selected": pt(e.selected),
      style: m,
      ref: Db(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Ib(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(w, { role: u.role, label: u.label }),
          Bb(t, e.fields),
          Pb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          qb(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function Fb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function zb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function jb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(w, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ n(w, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Wb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Fb, { count: e.items.length, cap: e.column.cap });
}
function Kb(e, t) {
  return e.roving ?? t;
}
function Gb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Ub(e, t) {
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
function Vb(e) {
  const t = y(), a = Jt({ orientation: "vertical" }), r = Kb(e, a), l = zb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": pt(l), "data-gate": pt(e.column.gate), children: [
    jb(e.column, e.items.length, t),
    Wb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Gb(e, a), children: Ub(e, r) })
  ] });
}
function Yb(e) {
  let t = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (t += " · p50 " + se(e.p50)), e.p90 !== void 0 && (t += " · p90 " + se(e.p90)), t;
}
function Jb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Qb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function x3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(w, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(w, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Yb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Jb(e),
      Qb(e.onConfigure),
      /* @__PURE__ */ n(Dn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Xb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Zb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function eg(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(w, { role: "running", label: String(t) + (t === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(w, { role: "soft", label: "Done" }) : null
  ] });
}
function T3(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": pt(Xb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Zb(e) }),
    /* @__PURE__ */ n(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(nr, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    eg(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function L3(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Br, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Vb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function tg(e, t) {
  const a = Ir(e);
  a !== void 0 && t(a);
}
function ng(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => tg(r, a));
  }, [e, t, a]);
}
function ag(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function rg(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function lg(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function og(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(w, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function M3(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = v((s = t.run) == null ? void 0 : s.lastStep);
  ng(e.feed, t.key, l);
  const o = [...ag(t), ...rg(t)];
  return /* @__PURE__ */ i(ut, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      o.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      lg(a, r)
    ] }),
    og(t, e.actions)
  ] });
}
const ig = "_card_1nkkx_3", sg = "_head_1nkkx_30", cg = "_mark_1nkkx_38", dg = "_name_1nkkx_50", ug = "_chips_1nkkx_71", hg = "_description_1nkkx_77", mg = "_run_1nkkx_82", wg = "_sep_1nkkx_91", _g = "_facts_1nkkx_97", fg = "_fact_1nkkx_97", vg = "_factLabel_1nkkx_111", bg = "_factValue_1nkkx_115", ie = {
  card: ig,
  head: sg,
  mark: cg,
  name: dg,
  chips: ug,
  description: hg,
  run: mg,
  sep: wg,
  facts: _g,
  fact: fg,
  factLabel: vg,
  factValue: bg
}, gg = { live: "done", draft: "running", paused: "meta" };
function pg(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function yg({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(w, { role: gg[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Ng({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function kg({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function $g({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Cg(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Sg({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: o, className: s }) {
  const c = { "--stream": ke(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: pg(s),
      style: c,
      "data-selected": d,
      "data-paused": Cg(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          e.streamStep === null ? null : /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Ng, { description: e.description }),
        /* @__PURE__ */ n(kg, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(yg, { versions: e.versions }),
        /* @__PURE__ */ n($g, { facts: o })
      ]
    }
  );
}
const Rg = "_list_4dcyc_2", xg = "_row_4dcyc_11", Tg = "_head_4dcyc_23", Lg = "_id_4dcyc_30", Mg = "_lock_4dcyc_35", Ag = "_reason_4dcyc_41", Eg = "_remove_4dcyc_46", Ig = "_clauses_4dcyc_50", Bg = "_clause_4dcyc_50", Pg = "_label_4dcyc_64", qg = "_cell_4dcyc_71", Og = "_value_4dcyc_76", ue = {
  list: Rg,
  row: xg,
  head: Tg,
  id: Lg,
  lock: Mg,
  reason: Ag,
  remove: Eg,
  clauses: Ig,
  clause: Bg,
  label: Pg,
  cell: qg,
  value: Og
}, Pr = $e(!1);
function A3({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Pr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ue.list, "aria-label": t, children: e }) });
}
function Dg({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(I, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function Hg({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ n(w, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ue.reason, children: e })
  ] });
}
function Fg({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ n("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Hg, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function $a(e, t) {
  return e.locked ? void 0 : t;
}
function E3({ rule: e, onChange: t, onRemove: a }) {
  if (!ge(Pr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = $a(e, t);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Fg, { rule: e, onRemove: $a(e, a) }),
    /* @__PURE__ */ n("dl", { className: ue.clauses, children: e.clauses.map((l) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ n("dt", { className: ue.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ue.cell, children: /* @__PURE__ */ n(Dg, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const zg = "_ladder_1xdeh_2", jg = "_cell_1xdeh_7", Wg = "_empty_1xdeh_26", Kg = "_name_1xdeh_34", Gg = "_holder_1xdeh_40", Ug = "_swatches_1xdeh_51", Vg = "_swatch_1xdeh_51", Yg = "_tilesFrame_1xdeh_78", Jg = "_tiles_1xdeh_78", Qg = "_tile_1xdeh_78", Xg = "_bar_1xdeh_117", Zg = "_hex_1xdeh_128", ep = "_note_1xdeh_138", oe = {
  ladder: zg,
  cell: jg,
  empty: Wg,
  name: Kg,
  holder: Gg,
  swatches: Ug,
  swatch: Vg,
  tilesFrame: Yg,
  tiles: Jg,
  tile: Qg,
  bar: Xg,
  hex: Zg,
  note: ep
}, I3 = "Not available yet";
function tp(e) {
  return e.reserved ? "reserved" : yt(e.step) ? "validated" : "partial";
}
function qr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function np(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function ap({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${oe.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function rp(e, t) {
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
const Ca = (e) => String(e).padStart(2, "0");
function op(e, t, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : t ?? qr(e, void 0);
}
function ip({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${oe.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${oe.hex} ward-ladder-hex`, children: r ? `step ${Ca(e)}` : Ql(e) }),
    /* @__PURE__ */ n("span", { className: `${oe.note} ward-ladder-note`, children: r ? a : `Step ${Ca(e)} · ${a}` })
  ] });
}
function sp({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: o }) {
  const s = tp(e), c = qr(s, a), d = c !== "free", u = d || o, h = t === e.step, m = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${m} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...lp(d, h, u), "data-validation": s, style: np(e, s), onClick: _, onKeyDown: (M) => rp(M, _) }, label: N, name: m, holder: c, validation: s, note: op(s, a, h), step: e.step };
}
const cp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${oe.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${oe.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(ip, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${oe.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(ap, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${oe.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${oe.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function dp(e) {
  return cp[e.presentation](sp(e));
}
function up(e) {
  for (const t of e)
    if (!t.reserved && !Qt(t.step)) throw new Error("colour ladder renders token steps only");
}
function hp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const mp = { list: oe.ladder, swatches: oe.swatches, tiles: oe.tilesFrame };
function wp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Or(e) {
  const t = e.takenBy ?? {}, a = (o) => {
    var s;
    (s = e.onChange) == null || s.call(e, o);
  };
  up(e.steps);
  const r = hp(e), l = e.steps.map((o) => /* @__PURE__ */ n(dp, { step: o, value: e.value, taken: t[o.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, o.step));
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...wp(e.disabled === !0), className: `${mp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: oe.tiles, children: l }) : l });
}
const _p = "_rail_s06lm_2", fp = "_section_s06lm_12", vp = "_sectionFlush_s06lm_22", bp = "_head_s06lm_26", gp = "_headLabel_s06lm_34", pp = "_sample_s06lm_42", yp = "_sampleLabel_s06lm_47", Np = "_sampleTitle_s06lm_54", kp = "_sampleMeta_s06lm_59", $p = "_trace_s06lm_65", Cp = "_traceHead_s06lm_70", Sp = "_steps_s06lm_78", Rp = "_step_s06lm_78", xp = "_stepTitle_s06lm_97", Tp = "_hollow_s06lm_107", Lp = "_stepBody_s06lm_115", Mp = "_stepDetail_s06lm_127", Ap = "_publish_s06lm_132", Ep = "_reason_s06lm_138", Ip = "_note_s06lm_143", Bp = "_reveal_s06lm_148", C = {
  rail: _p,
  section: fp,
  sectionFlush: vp,
  head: bp,
  headLabel: gp,
  sample: pp,
  sampleLabel: yp,
  sampleTitle: Np,
  sampleMeta: kp,
  trace: $p,
  traceHead: Cp,
  steps: Sp,
  step: Rp,
  stepTitle: xp,
  hollow: Tp,
  stepBody: Lp,
  stepDetail: Mp,
  publish: Ap,
  reason: Ep,
  note: Ip,
  reveal: Bp
}, Sa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Pp = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, qp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Op = { notSimulated: "not simulated", running: "running" };
function Dp(e) {
  return e.presentation === "foundry";
}
function Hp(e, t) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = t.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function Fp(e, t) {
  var r;
  const a = Pp[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function zp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function jp(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Wp(e) {
  if (zp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Kp(e) {
  const [t, a] = v(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${C.step} ${C.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Gp(e) {
  const t = Op[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: C.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Ke, { size: 6, kind: qp[e.kind], label: e.kind });
}
function Up(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: C.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Vp(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Yp(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Kp, { kind: t.kind, children: [
    /* @__PURE__ */ n(Gp, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: C.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: C.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Up, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Vp, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Jp(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(se(t)), a.join(" · ");
}
function Dr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${C.trace} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.traceHead, id: t, children: Jp(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: C.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Yp, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Qp(e) {
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
function Xp(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${C.sampleMeta} ${C.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + t + ". Nothing saved." });
}
function Zp(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ka(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function ey(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Ka(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function ty(e) {
  const t = ey(e.run);
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
function ny(e) {
  return /* @__PURE__ */ i("div", { className: `${C.publish} ${C.section}`, children: [
    /* @__PURE__ */ n(Hr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: C.note, children: e.note })
  ] });
}
function ay(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${C.publish} ${C.section}`, children: /* @__PURE__ */ n(Hr, { reason: e.reason, onPublish: e.onPublish }) });
}
function Fr(e) {
  return /* @__PURE__ */ i("div", { className: `${C.head} ${C.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: C.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(w, { role: Sa[e.run.status].role, label: Sa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function ry(e, t) {
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
function ly(e) {
  var a;
  jp(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Fr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Qp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Dr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Zp, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(an, { items: e.checklist }) }),
    /* @__PURE__ */ n(ny, { reason: Hp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function oy(e) {
  var r;
  const t = ry(e.run, e.feed);
  Wp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Fr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Xp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Dr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(ty, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(an, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(ay, { reason: Fp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function B3(e) {
  return Dp(e) ? /* @__PURE__ */ n(oy, { ...e }) : /* @__PURE__ */ n(ly, { ...e });
}
const iy = "_list_142ip_3", sy = "_row_142ip_9", cy = "_condition_142ip_18", dy = "_action_142ip_24", qt = {
  list: iy,
  row: sy,
  condition: cy,
  action: dy
}, zr = $e(!1);
function P3({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(zr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: qt.list, "aria-label": t, children: e }) });
}
function q3({ rule: e }) {
  if (!ge(zr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: qt.row, children: [
    /* @__PURE__ */ n(w, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: qt.condition, children: e.when }),
    /* @__PURE__ */ n(w, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: qt.action, children: e.then })
  ] });
}
const uy = "_move_tmppt_3", hy = {
  move: uy
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
function my(e) {
  return e === "up" ? "down" : "up";
}
function wy(e, t) {
  const a = Ra(e, t.id, t.direction) ?? Ra(e, t.id, my(t.direction));
  a == null || a.focus();
}
function Kr() {
  const e = f(null), [t, a] = v(null), [r, l] = v("");
  return S(() => {
    e.current !== null && t !== null && wy(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Gr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function jt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${hy.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const _y = "_body_1jd1i_2", fy = "_title_1jd1i_8", vy = "_section_1jd1i_13", by = "_legend_1jd1i_18", gy = "_stages_1jd1i_26", py = "_stage_1jd1i_26", yy = "_stageIndex_1jd1i_44", Ny = "_stageName_1jd1i_50", ky = "_footer_1jd1i_59", $y = "_note_1jd1i_66", Cy = "_reason_1jd1i_71", Sy = "_actions_1jd1i_76", Ry = "_webHead_1jd1i_83", xy = "_kicker_1jd1i_92", Ty = "_webTitle_1jd1i_99", Ly = "_webBody_1jd1i_105", My = "_webSection_1jd1i_109", Ay = "_sectionHead_1jd1i_121", Ey = "_sectionNote_1jd1i_129", Iy = "_formLabel_1jd1i_134", By = "_identityRow_1jd1i_139", Py = "_nameCell_1jd1i_145", qy = "_keyCell_1jd1i_150", Oy = "_colourCell_1jd1i_154", Dy = "_colourStatus_1jd1i_161", Hy = "_webStages_1jd1i_166", Fy = "_webStageList_1jd1i_172", zy = "_webStage_1jd1i_166", jy = "_webIndex_1jd1i_191", Wy = "_webStageName_1jd1i_196", Ky = "_webMoves_1jd1i_201", Gy = "_addStage_1jd1i_215", Uy = "_addStageButton_1jd1i_223", Vy = "_webFooter_1jd1i_236", Yy = "_webFooterNotes_1jd1i_244", Jy = "_webNote_1jd1i_251", g = {
  body: _y,
  title: fy,
  section: vy,
  legend: by,
  stages: gy,
  stage: py,
  stageIndex: yy,
  stageName: Ny,
  footer: ky,
  note: $y,
  reason: Cy,
  actions: Sy,
  webHead: Ry,
  kicker: xy,
  webTitle: Ty,
  webBody: Ly,
  webSection: My,
  sectionHead: Ay,
  sectionNote: Ey,
  formLabel: Iy,
  identityRow: By,
  nameCell: Py,
  keyCell: qy,
  colourCell: Oy,
  colourStatus: Dy,
  webStages: Hy,
  webStageList: Fy,
  webStage: zy,
  webIndex: jy,
  webStageName: Wy,
  webMoves: Ky,
  addStage: Gy,
  addStageButton: Uy,
  webFooter: Vy,
  webFooterNotes: Yy,
  webNote: Jy
}, Qy = (e) => e, Xy = [
  { value: "entry", label: "Entry" },
  { value: "agent", label: "Agent" },
  { value: "gate", label: "Review" },
  { value: "terminal", label: "Done" }
], Ur = "not a known stage";
function Zy(e, t, a) {
  const r = e.map((l) => ({ value: l, label: a(l) }));
  return e.includes(t) ? r : [{ value: t, label: `${t ? a(t) : "(unnamed)"} · ${Ur}` }, ...r];
}
function eN({ stage: e, index: t, catalogue: a, label: r, onName: l }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: l });
  const s = a.includes(e.name) ? void 0 : `${e.name ? r(e.name) : "This stage"} is ${Ur}`;
  return /* @__PURE__ */ n(I, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Zy(a, e.name, r), invalid: s, onChange: l });
}
function Vr(e, t, a) {
  return e.name ? a(e.name) : `stage ${t + 1}`;
}
function tN(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function nN({ id: e, stage: t, index: a, total: r, catalogue: l, label: o, onReplace: s, onMove: c }) {
  const d = Vr(t, a, o), u = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${g.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: g.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: g.webStageName, children: /* @__PURE__ */ n(eN, { stage: t, index: a, catalogue: l, label: o, onName: (h) => s({ ...t, name: h }) }) }),
    /* @__PURE__ */ n(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Xy, onChange: (h) => s({ ...t, kind: h }) }),
    /* @__PURE__ */ i("span", { className: g.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(jt, { id: e, name: d, direction: "up", onMove: () => c("up") }),
      a < r - 1 && /* @__PURE__ */ n(jt, { id: e, name: d, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function aN({ stages: e, onChange: t, catalogue: a, stageLabel: r = Qy }) {
  const l = tN(e.length), o = Kr(), s = (d, u) => {
    const h = jr(d, u);
    l.current = yn(l.current, d, h), o.moved({ id: l.current[h], direction: u }, Wr(Vr(e[d], d, r), h, e.length)), t(yn(e, d, h));
  }, c = (d, u) => t(e.map((h, m) => m === d ? u : h));
  return /* @__PURE__ */ i("div", { className: g.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: g.webStageList, "aria-label": "Workflow stages in order", children: e.map((d, u) => /* @__PURE__ */ n(nN, { id: l.current[u], stage: d, index: u, total: e.length, catalogue: a, label: r, onReplace: (h) => c(u, h), onMove: (h) => s(u, h) }, l.current[u])) }),
    /* @__PURE__ */ n(Gr, { text: o.announcement }),
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
], Yr = "Nothing runs until you create the stream.", iN = "Add a name and a key.", sN = "At least 2 stages";
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
      /* @__PURE__ */ n(I, { kind: "input", label: "Name", value: h, onChange: m }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: k, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: g.section, children: [
      /* @__PURE__ */ n("legend", { className: g.legend, children: "Colour" }),
      /* @__PURE__ */ n(Or, { label: "Colour", steps: a, value: O, onChange: we, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: g.section, children: [
      /* @__PURE__ */ n("legend", { className: g.legend, children: "Stages" }),
      /* @__PURE__ */ n(dN, { stages: ae, onMove: (Ge, xl) => Ce(yn(ae, Ge, xl)) })
    ] }),
    /* @__PURE__ */ n(Sr, { legend: "When items move on", options: l, value: Ze, onChange: A }),
    /* @__PURE__ */ n(uN, { reason: Se, onCreate: () => o(V), onDraft: () => s(V) })
  ] }) });
}
const wN = ["relay", "direct", "readonly"];
function _N(e) {
  return [
    { value: "relay", label: "Through Trellis (safe default)", consequence: `Agents never write to ${e} or Jira directly.` },
    { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
    { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
  ];
}
const fN = "Add a name, key, owner and two stages.";
function vN(e, t, a, r, l, o) {
  const s = wN.find((c) => c === l) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: o };
}
function bN(e, t) {
  return gN(e) && pN(e, t) && yN(e);
}
function gN(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function pN(e, t) {
  return e.colourStep === null || zn({ step: e.colourStep }, t);
}
function yN(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function NN(e, t) {
  if (e === null || zn({ step: e }, t)) return "";
  const a = t[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function kN({ ready: e, draft: t, onCreate: a, onDraft: r, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: g.webFooter, children: [
    /* @__PURE__ */ i("div", { className: g.webFooterNotes, children: [
      /* @__PURE__ */ n("p", { className: g.webNote, children: Yr }),
      !e && /* @__PURE__ */ n("p", { id: l, className: g.reason, children: fN })
    ] }),
    r && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => r(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => a(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function $N({ titleId: e }) {
  return /* @__PURE__ */ n("header", { className: g.webHead, children: /* @__PURE__ */ n("h2", { id: e, className: g.webTitle, children: "New stream" }) });
}
function CN({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: o }) {
  return /* @__PURE__ */ i("section", { className: g.webSection, children: [
    /* @__PURE__ */ n("h3", { className: g.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: g.identityRow, children: [
      /* @__PURE__ */ n("div", { className: g.nameCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: g.keyCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    o
  ] });
}
function SN(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, o] = v(""), [s, c] = v(""), [d, u] = v(e.owners[0] ?? ""), [h, m] = v(null), [_, N] = v("relay"), [k, M] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), O = vN(l, s, d, h, _, k), we = bN(O, r), ae = /* @__PURE__ */ i("div", { className: g.colourCell, children: [
    /* @__PURE__ */ n("span", { className: g.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Or, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: m, takenBy: r })
  ] }), Ce = NN(h, r), Ze = /* @__PURE__ */ i(x, { children: [
    Ce && /* @__PURE__ */ n("p", { className: g.colourStatus, "data-colour-status": "", children: Ce }),
    /* @__PURE__ */ n(I, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((A) => ({ value: A, label: A })), onChange: u })
  ] });
  return /* @__PURE__ */ i(ut, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n($N, { titleId: a }),
    /* @__PURE__ */ i("div", { className: g.webBody, children: [
      /* @__PURE__ */ n(CN, { name: l, setName: o, streamKey: s, setKey: c, colour: ae, owner: Ze }),
      e.fields && /* @__PURE__ */ n("section", { className: g.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: g.webSection, children: [
        /* @__PURE__ */ i("div", { className: g.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: g.kicker, children: "Stages" }),
          /* @__PURE__ */ n("span", { className: g.sectionNote, children: sN })
        ] }),
        /* @__PURE__ */ n(aN, { stages: k, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: g.webSection, children: /* @__PURE__ */ n(Sr, { variant: "cards", legend: "How agents write", value: _, options: _N(e.dataPlatform), onChange: N }) }),
      /* @__PURE__ */ n(kN, { ready: we, draft: O, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function O3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(SN, { ...e }) : /* @__PURE__ */ n(mN, { ...e });
}
const RN = "_row_bs8hc_2", xN = "_cell_bs8hc_6", TN = "_condition_bs8hc_11", LN = "_action_bs8hc_18", MN = "_contract_bs8hc_24", AN = "_contractCondition_bs8hc_33", EN = "_contractAction_bs8hc_39", ee = {
  row: RN,
  cell: xN,
  condition: TN,
  action: LN,
  contract: MN,
  contractCondition: AN,
  contractAction: EN
}, Jr = ["advance", "block", "escalate", "requestReview"], xa = {
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
    I,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Jr.map((l) => ({ value: l, label: xa[l] }))
    }
  );
}
function IN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(w, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Wt(e, r), children: Wt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(w, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: jn(e, t, a) })
  ] });
}
function BN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(w, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Wt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: jn(e, t, a) })
  ] });
}
function PN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(w, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Wt(e, r) }),
    /* @__PURE__ */ n(w, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: jn(e, t, a, !0) })
  ] });
}
const qN = { two: BN, four: IN, contract: PN };
function D3(e) {
  var a;
  if (!Jr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = qN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const ON = "_column_g1uat_2", DN = "_head_g1uat_17", HN = "_index_g1uat_23", FN = "_name_g1uat_29", zN = "_meta_g1uat_38", jN = "_mono_g1uat_43", WN = "_gate_g1uat_50", KN = "_reviewersLabel_g1uat_57", GN = "_reviewers_g1uat_57", UN = "_reviewer_g1uat_57", VN = "_agents_g1uat_74", YN = "_workflowColumn_g1uat_79", JN = "_workflowHead_g1uat_96", QN = "_stageRow_g1uat_102", XN = "_stageLabel_g1uat_109", ZN = "_workflowTitle_g1uat_116", e1 = "_workflowMeta_g1uat_122", t1 = "_workflowGate_g1uat_127", n1 = "_gateNote_g1uat_135", a1 = "_cardNote_g1uat_140", r1 = "_reviewerList_g1uat_145", l1 = "_reviewerRow_g1uat_151", o1 = "_reviewerMark_g1uat_157", i1 = "_reviewerName_g1uat_167", s1 = "_terminalCard_g1uat_173", c1 = "_terminalCount_g1uat_182", d1 = "_workflowAgents_g1uat_188", u1 = "_mount_g1uat_194", R = {
  column: ON,
  head: DN,
  index: HN,
  name: FN,
  meta: zN,
  mono: jN,
  gate: WN,
  reviewersLabel: KN,
  reviewers: GN,
  reviewer: UN,
  agents: VN,
  workflowColumn: YN,
  workflowHead: JN,
  stageRow: QN,
  stageLabel: XN,
  workflowTitle: ZN,
  workflowMeta: e1,
  workflowGate: t1,
  gateNote: n1,
  cardNote: a1,
  reviewerList: r1,
  reviewerRow: l1,
  reviewerMark: o1,
  reviewerName: i1,
  terminalCard: s1,
  terminalCount: c1,
  workflowAgents: d1,
  mount: u1
}, Ta = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function Wn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Qr(e) {
  return `${Math.round(e * 100)}%`;
}
function h1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(en, { cells: [
      { value: Qr(e.gateShare), label: "Held for review" },
      { value: ne(e.count), label: "In stage" }
    ] })
  ] });
}
function m1({ stage: e }) {
  return /* @__PURE__ */ n(en, { cells: [
    { value: ne(e.count), label: "In stage" },
    { value: Wn(e.closedThisWeek, ne), label: "Closed this week" }
  ] });
}
function w1({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    kt(e.name, Ta[e.kind]) ? null : /* @__PURE__ */ n(w, { role: e.kind === "gate" ? "gate" : "soft", label: Ta[e.kind] })
  ] });
}
function _1({ stage: e }) {
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
function f1({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(h1, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(m1, { stage: e }) : null;
}
function v1({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function b1({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), o = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(w1, { stage: e, titleId: l }),
    /* @__PURE__ */ n(_1, { stage: e }),
    /* @__PURE__ */ n(f1, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Sg, { ...s, connection: o }, s.agent.id)) }),
    /* @__PURE__ */ n(v1, { onMount: a })
  ] });
}
const g1 = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function p1({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function y1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.gateNote, children: t.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    t.length === 0 ? null : /* @__PURE__ */ n(p1, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Qr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function N1(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function k1({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Wn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: N1(e.rolledBackThisWeek) })
  ] });
}
function $1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function C1(e) {
  if (e.kind === "terminal") return `${Wn(e.closedThisWeek)} this week`;
  const t = $1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function S1({ stage: e, titleId: t }) {
  const a = g1[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || kt(e.name, a.label) ? null : /* @__PURE__ */ n(w, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: C1(e) })
  ] });
}
function R1(e) {
  return e === "entry" || e === "agent";
}
function x1({ stage: e, onMount: t }) {
  return t === void 0 || !R1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Add agent" });
}
function T1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(S1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(y1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(k1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(x1, { stage: e, onMount: a })
  ] });
}
function L1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function H3(e) {
  return L1(e) ? /* @__PURE__ */ n(T1, { ...e }) : /* @__PURE__ */ n(b1, { ...e });
}
const M1 = "_row_1tdra_6", A1 = "_name_1tdra_12", E1 = "_compactRow_1tdra_13", I1 = "_compactName_1tdra_13", B1 = "_cell_1tdra_30", P1 = "_chain_1tdra_45", q1 = "_owner_1tdra_51", O1 = "_mono_1tdra_57", D1 = "_compactCell_1tdra_79", H1 = "_stack_1tdra_96", F1 = "_stat_1tdra_103", z1 = "_identityLine_1tdra_110", j1 = "_identity_1tdra_110", W1 = "_ownerLine_1tdra_140", K1 = "_link_1tdra_160", G1 = "_gateMark_1tdra_166", U1 = "_emptyChain_1tdra_171", V1 = "_arrow_1tdra_177", Y1 = "_muted_1tdra_182", J1 = "_define_1tdra_187", Q1 = "_statValue_1tdra_194", X1 = "_policyId_1tdra_200", Z1 = "_sub_1tdra_205", p = {
  row: M1,
  name: A1,
  compactRow: E1,
  compactName: I1,
  cell: B1,
  chain: P1,
  owner: q1,
  mono: O1,
  compactCell: D1,
  stack: H1,
  stat: F1,
  identityLine: z1,
  identity: j1,
  ownerLine: W1,
  link: K1,
  gateMark: G1,
  emptyChain: U1,
  arrow: V1,
  muted: Y1,
  define: J1,
  statValue: Q1,
  policyId: X1,
  sub: Z1
};
function Xr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function ek(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function tk(e) {
  return e === void 0 ? p.compactRow : `${p.compactRow} ${e}`;
}
function Zr(e) {
  return `${ne(e)} ${e === 1 ? "member" : "members"}`;
}
function nk(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Zr(e.members)}`;
}
function ak(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: /* @__PURE__ */ i("span", { className: p.stack, children: [
    /* @__PURE__ */ i("span", { className: p.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${p.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${p.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(w, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: p.ownerLine, children: nk(e) })
  ] }) });
}
function el({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: p.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(w, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function rk(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = Zt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function lk({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${p.chain} ward-chiprow`, children: e.map((l, o) => /* @__PURE__ */ i("span", { className: p.link, children: [
    /* @__PURE__ */ n(el, { name: l.name, gate: l.gate === !0, look: rk(o, a, t), size: "tag" }),
    o === r ? null : /* @__PURE__ */ n("span", { className: p.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${o}`)) });
}
function ok(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: p.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: p.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: p.define, children: "Define workflow" })
  ] }) : lk(e) });
}
function tl(e) {
  return e === void 0 ? void 0 : !0;
}
function La(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: a }) : /* @__PURE__ */ i("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: `${p.statValue} ward-stat-value`, title: r, "data-raised": tl(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: p.sub, children: t })
  ] }) });
}
function ik(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: p.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: p.sub, children: e.summary })
  ] }) });
}
function sk(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function ck({ stream: e, href: t, presentation: a }) {
  const r = tk(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Xr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ke(e.streamStep, "chip") }, children: [
    ak(e, t),
    ok(e),
    La(sk(e.agents), e.agents === void 0 ? void 0 : ek(e.agents), "—"),
    ik(e.policy),
    La(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function dk(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function F3(e) {
  if (dk(e)) return ck(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: p.row, onClick: Xr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: p.cell, children: [
      /* @__PURE__ */ n("a", { className: `${p.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(w, { ...In(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(w, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ n("span", { className: p.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: p.link, children: /* @__PURE__ */ n(el, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: p.mono, children: Zr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, title: t.inFlightHint, "data-raised": tl(t.inFlightHint), children: ne(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, children: t.p50 === void 0 ? "" : se(t.p50) }) })
  ] });
}
const uk = "_row_2u4ll_2", hk = "_name_2u4ll_16", mk = "_scope_2u4ll_24", Kt = {
  row: uk,
  name: hk,
  scope: mk
};
function Kn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function wk(e) {
  return e === void 0 ? `${Kt.row} ward-toolrow` : `${Kt.row} ward-toolrow ${e}`;
}
function _k(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "Locked by stream policy" };
}
function fk({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
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
function vk({ classification: e }) {
  return /* @__PURE__ */ n(w, { role: e === "write" ? "write" : "meta", label: Kn(e) });
}
function bk({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Kt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function gk(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function z3({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), o = _k(e, a), s = gk(a);
  return /* @__PURE__ */ i(s, { className: wk(a == null ? void 0 : a.className), "data-locked": o.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(fk, { id: r, reasonId: l, tool: e, state: o, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Kt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(bk, { tool: e, state: o, reasonId: l }),
    /* @__PURE__ */ n(vk, { classification: e.classification }),
    o.locked ? /* @__PURE__ */ n(w, { role: "meta", label: "Locked" }) : null
  ] });
}
const pk = "_strip_4ppv9_2", yk = "_well_4ppv9_11", Nk = "_head_4ppv9_18", kk = "_name_4ppv9_24", $k = "_chart_4ppv9_32", Ck = "_segment_4ppv9_38", Sk = "_detailedChart_4ppv9_44", Rk = "_rail_4ppv9_57", xk = "_section_4ppv9_63", Tk = "_label_4ppv9_74", Lk = "_note_4ppv9_91", te = {
  strip: pk,
  well: yk,
  head: Nk,
  name: kk,
  chart: $k,
  segment: Ck,
  detailedChart: Sk,
  rail: Rk,
  section: xk,
  label: Tk,
  note: Lk
}, Mk = "Nothing to preview.", Nn = [1, 2, 3, 4, 5, 6], Gt = 100;
function Ak(e, t) {
  return t.has(e) ? ke(e, "id") : "var(--ward-color-line)";
}
function Ek({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: te.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Nn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: te.segment,
      x: l * Gt,
      y: "0",
      width: Gt,
      height: "8",
      fill: Ak(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ik(e) {
  const t = e.slice(0, Nn.length);
  for (; t.length < Nn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function Bk({ identities: e }) {
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
function nl(e) {
  return (t) => e == null ? void 0 : e(t);
}
function dn({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: te.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: te.label, children: e }),
    t
  ] });
}
function Pk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: te.note, children: t ?? Mk }) : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(nn, { item: { ...e, streamStep: Zt(a.streamStep) }, onOpen: nl(r), feed: null }) });
}
function qk({ draft: e }) {
  const t = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: te.head, style: t, children: [
    /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
    /* @__PURE__ */ n(w, { ...In(e.key, e.streamStep) })
  ] });
}
function Ok(e) {
  const t = Ik(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: te.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(dn, { label: "Board card", children: /* @__PURE__ */ n(Pk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Streams index row", children: /* @__PURE__ */ n(qk, { draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Overview chart segment", children: /* @__PURE__ */ n(Bk, { identities: t }) })
  ] });
}
function Dk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: te.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ i("div", { className: te.head, children: [
      /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
      /* @__PURE__ */ n(w, { ...In(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(nn, { item: { ...t, streamStep: e.streamStep }, onOpen: nl(r) }) }),
    /* @__PURE__ */ n(Ek, { draft: e, streams: a })
  ] });
}
function j3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Ok, { ...e }) : /* @__PURE__ */ n(Dk, { ...e });
}
const Hk = "_row_ixlg5_6", Fk = "_headCell_ixlg5_10", zk = "_cell_ixlg5_11", jk = "_name_ixlg5_23", Wk = "_consequence_ixlg5_29", Kk = "_governed_ixlg5_36", Gk = "_control_ixlg5_42", Uk = "_byRole_ixlg5_48", Vk = "_webControl_ixlg5_59", Yk = "_webConsequence_ixlg5_65", Jk = "_webGoverned_ixlg5_71", z = {
  row: Hk,
  headCell: Fk,
  cell: zk,
  name: jk,
  consequence: Wk,
  governed: Kk,
  control: Gk,
  byRole: Uk,
  webControl: Vk,
  webConsequence: Yk,
  webGoverned: Jk
};
function Qk({
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
function Xk({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Qk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Zk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function e$({ name: e, cell: t, onChange: a }) {
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
function t$({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: z.row, children: [
    /* @__PURE__ */ i("td", { className: z.cell, children: [
      /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${z.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(e$, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webGoverned} ward-cellmeta`, children: Zk(e) }) })
  ] });
}
function W3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(t$, { ...e }) : /* @__PURE__ */ n(Xk, { ...e });
}
const n$ = "_row_vv64h_2", a$ = "_cell_vv64h_6", r$ = "_name_vv64h_25", l$ = "_note_vv64h_30", o$ = "_webName_vv64h_41", i$ = "_webMeta_vv64h_47", J = {
  row: n$,
  cell: a$,
  name: r$,
  note: l$,
  webName: o$,
  webMeta: i$
}, al = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function s$(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function c$({ component: e, onRestart: t }) {
  const a = y(), r = al[e.state], l = e.state === "drainFirst";
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
function d$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: s$(e.state) });
}
function u$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(w, { ...al[e.state] }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(d$, { component: e, onRestart: t }) })
  ] });
}
function K3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(u$, { ...e }) : /* @__PURE__ */ n(c$, { ...e });
}
const h$ = "_row_jcm5k_7", m$ = "_cell_jcm5k_11", w$ = "_next_jcm5k_28", _$ = "_headCell_jcm5k_38", f$ = "_webId_jcm5k_77", v$ = "_webPurpose_jcm5k_83", b$ = "_webMeta_jcm5k_91", g$ = "_webUrgent_jcm5k_97", W = {
  row: h$,
  cell: m$,
  next: w$,
  headCell: _$,
  webId: f$,
  webPurpose: v$,
  webMeta: b$,
  webUrgent: g$
}, p$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, y$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, rl = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], N$ = Object.fromEntries(rl.map((e) => [e.key, e]));
function tt({ column: e, children: t }) {
  const a = N$[e];
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
function G3() {
  return /* @__PURE__ */ n("tr", { children: rl.map((e) => /* @__PURE__ */ n(
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
function k$({ cred: e }) {
  const t = p$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n(tt, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(tt, { column: "id", children: e.id }),
    /* @__PURE__ */ n(tt, { column: "state", children: /* @__PURE__ */ n(w, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(tt, { column: "cls", children: /* @__PURE__ */ n(w, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) }) }),
    /* @__PURE__ */ n(tt, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(tt, { column: "next", children: /* @__PURE__ */ n("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function $$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function C$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(w, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n($$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(w, { ...y$[e.state] }) })
  ] });
}
function U3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(C$, { ...e }) : /* @__PURE__ */ n(k$, { ...e });
}
const S$ = "_card_lpp45_2", R$ = "_head_lpp45_11", x$ = "_env_lpp45_18", T$ = "_version_lpp45_25", L$ = "_meta_lpp45_32", M$ = "_webCard_lpp45_37", A$ = "_webRow_lpp45_47", E$ = "_webTitle_lpp45_55", I$ = "_webLine_lpp45_65", B$ = "_webVersion_lpp45_72", P$ = "_webMeta_lpp45_77", Y = {
  card: S$,
  head: R$,
  env: x$,
  version: T$,
  meta: L$,
  webCard: M$,
  webRow: A$,
  webTitle: E$,
  webLine: I$,
  webVersion: B$,
  webMeta: P$
}, Ma = { dev: "Dev", uat: "UAT", prod: "Prod" }, ll = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function q$({ env: e }) {
  const t = ll[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function O$(e) {
  const t = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function D$(e) {
  return /* @__PURE__ */ i("article", { className: `${Y.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${Y.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Y.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(w, { ...ll[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Y.version} ${Y.webVersion} ${Y.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Y.meta} ${Y.webMeta} ${Y.webLine} ward-cellmeta`, children: O$(e) })
  ] });
}
function V3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(D$, { ...e }) : /* @__PURE__ */ n(q$, { ...e });
}
const H$ = "_panel_1hmja_2", F$ = "_line_1hmja_8", z$ = "_actions_1hmja_14", Tt = {
  panel: H$,
  line: F$,
  actions: z$
};
function Y3(e) {
  return /* @__PURE__ */ i("div", { className: Tt.panel, children: [
    /* @__PURE__ */ n("p", { className: Tt.line, children: e.status }),
    /* @__PURE__ */ n(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Tt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Tt.line, children: e.note ?? "" })
  ] });
}
const j$ = "_upload_13fcl_2", W$ = "_preview_13fcl_7", K$ = "_mark_13fcl_17", G$ = "_empty_13fcl_22", U$ = "_actions_13fcl_28", V$ = "_input_13fcl_33", Y$ = "_reasons_13fcl_41", J$ = "_reason_13fcl_41", Q$ = "_accepted_13fcl_57", re = {
  upload: j$,
  preview: W$,
  mark: K$,
  empty: G$,
  actions: U$,
  input: V$,
  reasons: Y$,
  reason: J$,
  accepted: Q$
}, ol = 1.5, il = 22, Ut = "script elements or event handlers", He = "links or external references", Ee = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ol}px at ${il}px`], X$ = [Ee[1], Ee[2], Ut, He], Z$ = /* @__PURE__ */ new Map([
  ["image", Ee[1]],
  ["text", Ee[2]],
  ["tspan", Ee[2]],
  ["textPath", Ee[2]],
  ["script", Ut],
  ["foreignObject", Ut],
  ["a", He],
  ["use", He],
  ["style", He],
  ["feImage", He],
  ["set", He]
]), e0 = "http://www.w3.org/2000/svg", t0 = "http://www.w3.org/2000/xmlns/", n0 = /* @__PURE__ */ new Set([
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
]), a0 = /* @__PURE__ */ new Set([
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
]), Gn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, r0 = /url\s*\(|['"\\]/i;
function l0() {
  return { ok: !1, reasons: [Ee[1]] };
}
function sl(e) {
  return e.namespaceURI === e0;
}
function o0(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && sl(t) ? t : null;
  } catch {
    return null;
  }
}
function i0(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ee[0]] : [];
}
function s0(e) {
  return Z$.get(e.localName) ?? (e.localName.startsWith("animate") ? He : void 0);
}
function c0(e) {
  return r0.test(e.replace(Gn, ""));
}
function d0(e) {
  return /^on/i.test(e.localName) ? Ut : e.localName === "href" || c0(e.value) ? He : void 0;
}
function u0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(s0(a));
    for (const r of Array.from(a.attributes)) t.add(d0(r));
  }
  return X$.filter((a) => t.has(a));
}
function h0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? il / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const o = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(o) && o * r < ol;
  }) ? [Ee[3]] : [];
}
function m0(e) {
  if (e.namespaceURI === t0) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (a0.has(t) || t.startsWith("stroke"));
}
function w0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && sl(t) && n0.has(t.localName);
}
function _0(e, t) {
  w0(t) ? t.nodeType === Node.ELEMENT_NODE && cl(t) : e.removeChild(t);
}
function cl(e) {
  for (const t of Array.from(e.attributes)) m0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) _0(e, t);
  return e;
}
function f0(e) {
  return Array.from(e.matchAll(Gn), (t) => t[2]).filter((t) => t !== "");
}
function v0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function b0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const o of f0(l.value)) a.has(o) || a.set(o, `${t}-${a.size}`);
  return a;
}
function g0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Gn, (r, l, o) => {
      const s = t.get(o);
      return s === void 0 ? r : r.replace(`#${o}`, `#${s}`);
    });
}
function p0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = b0(a, t);
  for (const l of a) {
    const o = r.get(l.getAttribute("id") ?? "");
    o === void 0 ? l.removeAttribute("id") : l.setAttribute("id", o), g0(l, r);
  }
  return e;
}
function J3(e) {
  const t = o0(e);
  if (t === null) return l0();
  const a = [...i0(t), ...u0(t), ...h0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(p0(cl(t), v0(e))) };
}
const y0 = "Mark accepted.", N0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, k0 = new Set(Ua.flatMap((e) => [ke(e, "id"), ke(e, "chip")]));
function $0(e) {
  return e !== void 0 && (N0.test(e) || k0.has(e)) ? e : void 0;
}
function C0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: re.preview, style: { "--mark": $0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: re.empty }) });
}
function S0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function R0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function x0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("p", { className: re.accepted, children: y0 }) }) : /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: re.reason, children: t }, t)) }) });
}
function T0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(x0, { result: e }) : /* @__PURE__ */ n("p", { className: `${re.result} ${S0(e, a)}`, role: "status", children: R0(e, a) });
}
function Aa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function Q3({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const o = f(null), [s, c] = v(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ n(C0, { current: e }),
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
    /* @__PURE__ */ n(T0, { result: s, presentation: r })
  ] });
}
const L0 = "_row_o3t6y_7", M0 = "_cell_o3t6y_11", A0 = "_head_o3t6y_28", E0 = "_name_o3t6y_34", I0 = "_pinned_o3t6y_42", B0 = "_headCell_o3t6y_49", P0 = "_webName_o3t6y_88", q0 = "_webMeta_o3t6y_95", O0 = "_webWarn_o3t6y_103", D = {
  row: L0,
  cell: M0,
  head: A0,
  name: E0,
  pinned: I0,
  headCell: B0,
  webName: P0,
  webMeta: q0,
  webWarn: O0
}, Un = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, dl = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], D0 = Object.fromEntries(dl.map((e) => [e.key, e]));
function H0(e, t) {
  return `mcp.${e}.${t}`;
}
function F0(e) {
  return Object.keys(Un).includes(e);
}
function z0(e) {
  return Un[e !== void 0 && F0(e) ? e : "unknown"];
}
function mt({ column: e, children: t }) {
  const a = D0[e];
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
function X3() {
  return /* @__PURE__ */ n("tr", { children: dl.map((e) => /* @__PURE__ */ n(
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
function j0({ server: e }) {
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
    /* @__PURE__ */ n(mt, { column: "tools", children: e.tools.map((a) => H0(e.name, a)).join(" · ") })
  ] });
}
function W0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function K0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function G0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function U0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function V0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function Y0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: W0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: l.map((o) => o.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(w, { ...K0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(G0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(w, { ...z0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n(U0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(V0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function Z3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Y0, { ...e }) : /* @__PURE__ */ n(j0, { ...e });
}
const J0 = "_row_zgozg_2", Q0 = "_headCell_zgozg_14", X0 = "_cell_zgozg_15", Z0 = "_name_zgozg_26", eC = "_consequence_zgozg_32", tC = "_reason_zgozg_38", nC = "_value_zgozg_44", aC = "_webRow_zgozg_69", rC = "_webSetting_zgozg_82", lC = "_webName_zgozg_90", oC = "_webConsequence_zgozg_98", iC = "_webControl_zgozg_104", sC = "_webState_zgozg_118", cC = "_webChip_zgozg_123", q = {
  row: J0,
  headCell: Q0,
  cell: X0,
  name: Z0,
  consequence: eC,
  reason: tC,
  value: nC,
  webRow: aC,
  webSetting: rC,
  webName: lC,
  webConsequence: oC,
  webControl: iC,
  webState: sC,
  webChip: cC
}, ul = 104, hl = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function dC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Xe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(kr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: q.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function uC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), o = hl[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: q.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: q.headCell, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: q.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: q.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(dC, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: q.cell, style: { width: ul }, children: /* @__PURE__ */ n(w, { role: o.role, label: o.label }) })
  ] });
}
function ml(e, t) {
  return String(e ?? t);
}
function hC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function mC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? ml(e.value, "—");
}
function wC({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const o = e.value === !0;
  return /* @__PURE__ */ i("span", { className: q.webControl, children: [
    /* @__PURE__ */ n(Xe, { label: t, labelHidden: !0, checked: o, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: q.webState, "aria-hidden": "true", children: a || o ? "on" : "off" })
  ] });
}
function _C(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(wC, { ...e });
  const l = hC(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: q.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(kr, { options: l, value: ml(t.value, ""), onChange: (o) => r == null ? void 0 : r(o) }) }) : /* @__PURE__ */ n("span", { className: `${q.webControl} ${q.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: mC(t) });
}
function fC({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: o }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${q.row} ${q.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: q.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${q.name} ${q.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${q.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    o ? /* @__PURE__ */ n("span", { className: q.webControl, children: o(s) }) : /* @__PURE__ */ n(_C, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${q.webChip} ward-policy-chip`, style: { width: ul }, children: /* @__PURE__ */ n(w, { ...hl[a], size: "tag" }) })
  ] });
}
function e4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fC, { ...e }) : /* @__PURE__ */ n(uC, { ...e });
}
const vC = "_label_1fzq1_7", bC = "_name_1fzq1_15", gC = "_column_1fzq1_24", pC = "_webFrame_1fzq1_57", yC = "_webHead_1fzq1_62", NC = "_webHeadLabel_1fzq1_74", kC = "_webLabel_1fzq1_118", $C = "_webColumns_1fzq1_125", CC = "_webGroup_1fzq1_131", SC = "_webPeople_1fzq1_132", RC = "_webVia_1fzq1_133", xC = "_webMeta_1fzq1_162", K = {
  label: vC,
  name: bC,
  column: gC,
  webFrame: pC,
  webHead: yC,
  webHeadLabel: NC,
  webLabel: kC,
  webColumns: $C,
  webGroup: CC,
  webPeople: SC,
  webVia: RC,
  webMeta: xC
}, TC = {
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
function LC(e) {
  if (!e.matrixRole) return;
  const t = TC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function MC({ node: e }) {
  const t = LC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(AC, { role: t, node: e }),
    /* @__PURE__ */ n(hn, { column: un[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(hn, { column: un[1], children: e.people === void 0 ? "" : ne(e.people) }),
    /* @__PURE__ */ n(hn, { column: un[2], children: e.requestedVia ?? "" })
  ] });
}
function AC({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(w, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(w, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(w, { role: "warn", label: "Unresolved" })
  ] });
}
function EC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: o, children: s }) {
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
      label: /* @__PURE__ */ n(MC, { node: a }),
      children: s
    }
  );
}
function mn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function IC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(mn, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function BC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ n("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function PC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(w, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(w, { role: "meta", label: "default" }) : null
  ] });
}
function qC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function OC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(BC, {}),
    /* @__PURE__ */ n($_, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Mr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(PC, { row: a }),
        detail: /* @__PURE__ */ n(IC, { row: a }),
        expanded: qC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function t4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(OC, { ...e }) : /* @__PURE__ */ n(EC, { ...e });
}
const DC = "_runbook_b9agc_2", HC = "_list_b9agc_7", FC = "_step_b9agc_15", zC = "_numeral_b9agc_21", jC = "_body_b9agc_28", WC = "_head_b9agc_34", KC = "_title_b9agc_40", GC = "_detail_b9agc_45", UC = "_actions_b9agc_50", VC = "_webList_b9agc_56", YC = "_webStep_b9agc_60", JC = "_webBody_b9agc_66", QC = "_webTitle_b9agc_74", XC = "_webDetail_b9agc_78", B = {
  runbook: DC,
  list: HC,
  step: FC,
  numeral: zC,
  body: jC,
  head: WC,
  title: KC,
  detail: GC,
  actions: UC,
  webList: VC,
  webStep: YC,
  webBody: JC,
  webTitle: QC,
  webDetail: XC
}, wl = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function _l(e) {
  return String(e + 1).padStart(2, "0");
}
function ZC({ step: e, index: t, connection: a }) {
  const r = wl[e.state], l = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: B.numeral, children: _l(t) }),
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
function eS({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: B.list, children: e.map((r, l) => /* @__PURE__ */ n(ZC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: B.actions, children: t })
  ] });
}
function tS({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: _l(t) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(w, { ...wl[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function nS({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(tS, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${B.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function n4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(nS, { ...e }) : /* @__PURE__ */ n(eS, { ...e });
}
const aS = "_list_1gu6a_2", rS = "_check_1gu6a_10", lS = "_body_1gu6a_16", oS = "_text_1gu6a_23", iS = "_pending_1gu6a_32", sS = "_measured_1gu6a_37", rt = {
  list: aS,
  check: rS,
  body: lS,
  text: oS,
  pending: iS,
  measured: sS
};
function cS(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function dS({ check: e }) {
  const t = cS(e.passed);
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
function a4({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${rt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(dS, { check: t }, t.text)) });
}
const uS = "_root_y6bbq_2", hS = "_list_y6bbq_10", mS = "_line_y6bbq_32", wS = "_at_y6bbq_59", _S = "_text_y6bbq_63", fS = "_foot_y6bbq_67", vS = "_idle_y6bbq_79", bS = "_caret_y6bbq_87", gS = "_jump_y6bbq_94", pe = {
  root: uS,
  list: hS,
  line: mS,
  at: wS,
  text: _S,
  foot: fS,
  idle: vS,
  caret: bS,
  jump: gS
}, pS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function kn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : pS.format(new Date(e));
}
const yS = { warn: "warning", ok: "ok" };
function NS({ kind: e }) {
  const t = yS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function kS({ connection: e, idleSince: t, last: a }) {
  return e === "stale" ? /* @__PURE__ */ n("span", { className: pe.idle, children: `Quiet since ${kn([t, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ n("span", { children: `Last event ${kn(a.at)}` });
}
function $S({ connection: e, idleSince: t, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n(kS, { connection: e, idleSince: t, last: a }),
    r
  ] });
}
const CS = 8;
function SS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > CS;
}
function RS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const fl = $e(null);
function r4({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = v(!1), o = Fa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(fl.Provider, { value: o, children: a });
}
function xS() {
  const e = ge(fl), [t, a] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const TS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function l4({ lines: e, connection: t, idleSince: a, label: r = "Activity", fixed: l }) {
  const o = f(null), [s, c] = v(0), [d, u] = xS(), [h, m] = v(!1), _ = e.at(-1);
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
    /* @__PURE__ */ n("ol", { className: pe.list, ref: o, "aria-live": d ? "polite" : "off", "aria-label": r, ...TS(e.length, l), onScroll: (k) => m(SS(k.currentTarget)), children: e.map((k, M) => /* @__PURE__ */ i("li", { className: `${pe.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": M < s, children: [
      /* @__PURE__ */ n("span", { className: pe.at, children: kn(k.at) }),
      /* @__PURE__ */ n(NS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${M}`)) }),
    /* @__PURE__ */ i($S, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(RS, { shown: h, onJump: N })
    ] })
  ] });
}
const LS = "_row_1k8wl_2", MS = "_head_1k8wl_14", AS = "_author_1k8wl_20", ES = "_eta_1k8wl_25", IS = "_edited_1k8wl_26", BS = "_body_1k8wl_32", PS = "_reason_1k8wl_37", qS = "_actions_1k8wl_42", xe = {
  row: LS,
  head: MS,
  author: AS,
  eta: ES,
  edited: IS,
  body: BS,
  reason: PS,
  actions: qS
}, OS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function DS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function HS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: o }) {
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
function FS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: xe.reason, id: t, children: e })
  ] });
}
function zS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function jS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(HS, { ...e }) : /* @__PURE__ */ n(FS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function o4(e) {
  const { comment: t } = e;
  zS(e);
  const a = y(), r = `${a}-unavailable`, l = OS[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${xe.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: xe.head, children: [
      /* @__PURE__ */ n("span", { className: xe.author, children: t.author }),
      /* @__PURE__ */ n(w, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: xe.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: xe.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: xe.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: xe.reason, id: a, children: DS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: xe.actions, children: /* @__PURE__ */ n(jS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const WS = "_root_lxbd7_2", KS = "_attach_lxbd7_11", GS = "_actions_lxbd7_17", US = "_reply_lxbd7_23", VS = "_replyField_lxbd7_28", YS = "_send_lxbd7_54", JS = "_sendIcon_lxbd7_65", Je = {
  root: WS,
  attach: KS,
  actions: GS,
  reply: US,
  replyField: VS,
  send: YS,
  sendIcon: JS
};
function vl({ value: e, onChange: t }) {
  const [a, r] = v("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function QS() {
  return /* @__PURE__ */ n("svg", { className: Je.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function XS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function ZS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, o] = vl(e), s = () => {
    l.trim() !== "" && r(a, l);
  }, c = (d) => {
    XS(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ n("div", { className: Je.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Je.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ n(I, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: o }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Je.send, onClick: s, children: [
      /* @__PURE__ */ n(QS, {}),
      /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function i4(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(ZS, { ...e }) : /* @__PURE__ */ n(e2, { ...e });
}
function e2(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: o, onDraft: s } = e, [c, d] = vl(e);
  return /* @__PURE__ */ i("div", { className: Je.root, children: [
    /* @__PURE__ */ n(I, { kind: "textarea", label: t, value: c, onChange: d }),
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
const t2 = "_list_1yhks_2", n2 = "_item_1yhks_6", a2 = "_body_1yhks_22", r2 = "_text_1yhks_28", l2 = "_evidence_1yhks_37", o2 = "_consequence_1yhks_49", ot = {
  list: t2,
  item: n2,
  body: a2,
  text: r2,
  evidence: l2,
  consequence: o2
};
function i2({ criterion: e }) {
  return /* @__PURE__ */ n(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ea({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function s2({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: ot.body, children: [
    /* @__PURE__ */ n("span", { className: ot.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ea, { text: " · " }),
      /* @__PURE__ */ n("code", { className: ot.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ea, { text: " · " }),
      /* @__PURE__ */ n("span", { className: ot.consequence, children: e.why })
    ] })
  ] });
}
function c2({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: ot.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(i2, { criterion: e }),
    /* @__PURE__ */ n(s2, { criterion: e })
  ] });
}
function s4({ criteria: e }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("ul", { className: `${ot.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(c2, { criterion: t }, t.text)) }) });
}
const d2 = "_list_dwhoz_2", u2 = "_rung_dwhoz_6", h2 = "_name_dwhoz_18", m2 = "_actor_dwhoz_32", Ot = {
  list: d2,
  rung: u2,
  name: h2,
  actor: m2
}, w2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function _2({ rung: e }) {
  const t = w2[e.state];
  return /* @__PURE__ */ i("li", { className: Ot.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Ot.name, children: e.name }),
    /* @__PURE__ */ n(w, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Ot.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function c4({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ot.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(_2, { rung: t }, t.name)) });
}
const f2 = "_sheet_pw37w_2", v2 = "_title_pw37w_9", b2 = "_stage_pw37w_15", g2 = "_effects_pw37w_20", p2 = "_effect_pw37w_20", y2 = "_numeral_pw37w_31", N2 = "_effectText_pw37w_38", k2 = "_refusals_pw37w_43", $2 = "_reasons_pw37w_52", C2 = "_reason_pw37w_52", S2 = "_actions_pw37w_62", _e = {
  sheet: f2,
  title: v2,
  stage: b2,
  effects: g2,
  effect: p2,
  numeral: y2,
  effectText: N2,
  refusals: k2,
  reasons: $2,
  reason: C2,
  actions: S2
};
function R2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function d4({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: o, returnFocusTo: s }) {
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
      rw,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This run adds", amount: r.more },
          { label: "Total", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(I, { kind: "textarea", label: "Note", value: u, onChange: h }),
    m && /* @__PURE__ */ i("div", { className: _e.refusals, children: [
      /* @__PURE__ */ n(w, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: _e.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: _e.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: _e.actions, children: [
      /* @__PURE__ */ n(R2, { refused: m, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: o, children: "Cancel" })
    ] })
  ] }) });
}
const x2 = "_list_1laeg_2", T2 = "_path_1laeg_7", L2 = "_consequence_1laeg_35", $n = {
  list: x2,
  path: T2,
  consequence: L2
}, Ia = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function M2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ba(e) {
  return e ? "primary" : "secondary";
}
function A2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Ba(t), size: "sm", onClick: () => a(e.kind), children: Ia[e.kind] }) : /* @__PURE__ */ n(b, { variant: Ba(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Ia[e.kind] });
}
function E2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: $n.path, "data-allowed": e.allowed, "data-role": M2(e.requiredRole), children: [
    /* @__PURE__ */ n("span", { className: $n.consequence, children: e.consequence }),
    /* @__PURE__ */ n(A2, { path: e, primary: t, onChoose: a })
  ] });
}
function u4({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: $n.list, children: e.map((a, r) => /* @__PURE__ */ n(E2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const I2 = "_list_1m7i0_2", B2 = "_item_1m7i0_6", P2 = "_node_1m7i0_18", q2 = "_body_1m7i0_24", O2 = "_head_1m7i0_30", D2 = "_stage_1m7i0_36", H2 = "_version_1m7i0_41", F2 = "_sentence_1m7i0_49", z2 = "_meta_1m7i0_54", Le = {
  list: I2,
  item: B2,
  node: P2,
  body: q2,
  head: O2,
  stage: D2,
  version: H2,
  sentence: F2,
  meta: z2
}, j2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function W2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Le.head, children: [
    /* @__PURE__ */ n("span", { className: Le.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Le.version, title: e.version, children: e.version }) : null
  ] });
}
function K2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Le.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Le.node} ward-history-node`, children: /* @__PURE__ */ n(Ke, { size: 9, kind: j2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Le.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(W2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Le.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Le.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function h4({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Le.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(K2, { entry: t }, t.stage + String(a))) });
}
const G2 = "_thread_1dsr3_3", U2 = "_turn_1dsr3_8", V2 = "_who_1dsr3_27", Y2 = "_body_1dsr3_32", J2 = "_working_1dsr3_75", Q2 = "_dots_1dsr3_84", X2 = "_step_1dsr3_84", Z2 = "_note_1dsr3_96", fe = {
  thread: G2,
  turn: U2,
  who: V2,
  body: Y2,
  working: J2,
  dots: Q2,
  step: X2,
  note: Z2
}, Vn = $e(!1);
function m4({ children: e, density: t }) {
  return /* @__PURE__ */ n(Vn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${fe.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function w4({ turn: e }) {
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
function eR() {
  return /* @__PURE__ */ i("span", { className: fe.dots, "aria-hidden": "true", "data-dots": "true", children: [
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" })
  ] });
}
function tR({ step: e, note: t }) {
  return /* @__PURE__ */ i("span", { role: "status", className: fe.step, children: [
    e === "" ? null : /* @__PURE__ */ n("span", { children: e }),
    t ? /* @__PURE__ */ n("span", { className: fe.note, children: t }) : null
  ] });
}
function _4({ author: e, step: t, body: a = "", note: r }) {
  if (!ge(Vn)) throw new Error("ChatWorking: must be rendered inside a Conversation");
  const l = a !== "";
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": "agent", "data-turn": "agent", "data-working": "true", children: [
    /* @__PURE__ */ n("span", { className: `${fe.who} ward-chat-who`, children: e }),
    /* @__PURE__ */ i("p", { className: `${fe.working} ward-chat-working`, children: [
      l ? null : /* @__PURE__ */ n(eR, {}),
      /* @__PURE__ */ n(tR, { step: t, note: r })
    ] }),
    l ? /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: a }) : null
  ] });
}
const nR = "_list_yiolt_3", aR = "_row_yiolt_7", rR = "_label_yiolt_20", lR = "_n_yiolt_26", oR = "_cause_yiolt_33", bt = {
  list: nR,
  row: aR,
  label: rR,
  n: lR,
  cause: oR
};
function iR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const sR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function cR({ row: e, formatNumber: t }) {
  return iR(e), /* @__PURE__ */ i("li", { className: `${bt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ke, { size: 8, ...sR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: bt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${bt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(dR, { cause: e.cause })
  ] });
}
function dR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${bt.cause} ward-healthrow-cause`, children: e }) : null;
}
function f4({ rows: e, formatNumber: t = ne }) {
  return /* @__PURE__ */ n("ul", { className: `${bt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(cR, { row: a, formatNumber: t }, a.label)) });
}
const uR = "_root_1jxwp_2", hR = {
  root: uR
};
function v4({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: hR.root, "data-density": l, children: [
    /* @__PURE__ */ n(an, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const mR = "_row_dhbre_3", wR = "_key_dhbre_13", _R = "_stack_dhbre_24", fR = "_value_dhbre_32", vR = "_evidence_dhbre_39", bR = "_mark_dhbre_47", nt = {
  row: mR,
  key: wR,
  stack: _R,
  value: fR,
  evidence: vR,
  mark: bR
};
function gR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(w, { role: "warn", label: "Check" }) : /* @__PURE__ */ n(On, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function b4({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${nt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${nt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${nt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${nt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${nt.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${nt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(gR, { state: e.state }) })
  ] });
}
const pR = "_cell_gh2sd_2", yR = {
  cell: pR
}, NR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function kR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function $R(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function CR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: kR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function SR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function g4({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  $R(e, a);
  const r = SR(e);
  return /* @__PURE__ */ n(
    bw,
    {
      label: "Rejection rules",
      columns: NR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, o) => /* @__PURE__ */ n("span", { className: yR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: CR(l, o) }),
      empty: t ?? /* @__PURE__ */ n(uf, { sentence: "No rejection rules yet." })
    }
  );
}
const RR = "_row_1f2re_2", xR = "_title_1f2re_12", TR = "_turns_1f2re_18", LR = "_waiting_1f2re_19", MR = "_resolved_1f2re_20", AR = "_activity_1f2re_21", ER = "_cost_1f2re_28", IR = "_link_1f2re_29", BR = "_tableLink_1f2re_47", PR = "_tableRecord_1f2re_48", qR = "_tableRow_1f2re_59", OR = "_tableTitle_1f2re_71", DR = "_tableResolved_1f2re_76", HR = "_tableMeta_1f2re_87", FR = "_tableCost_1f2re_94", zR = "_tableActivity_1f2re_95", jR = "_tableState_1f2re_105", F = {
  row: RR,
  title: xR,
  turns: TR,
  waiting: LR,
  resolved: MR,
  activity: AR,
  cost: ER,
  link: IR,
  tableLink: BR,
  tableRecord: PR,
  tableRow: qR,
  tableTitle: OR,
  tableResolved: DR,
  tableMeta: HR,
  tableCost: FR,
  tableActivity: zR,
  tableState: jR
}, bl = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function WR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function KR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function GR(e) {
  const t = e.join(", ");
  return t === "" ? "—" : t;
}
const UR = { duplicate: "Closed · duplicate" };
function VR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(st, { className: F.tableMeta, text: `waiting on ${e}` });
}
function YR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: F.tableCost, children: e === void 0 ? null : le(e) });
}
function JR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${F.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function QR({ session: e, href: t }) {
  const a = bl[e.state];
  return /* @__PURE__ */ i("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${F.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(st, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: F.tableMeta, children: KR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: F.tableResolved, children: [
      GR(e.resolved),
      /* @__PURE__ */ n(VR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(YR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: F.tableActivity, children: WR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: F.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(w, { role: a.role, label: UR[e.state] ?? a.label }),
      /* @__PURE__ */ n(JR, { link: e.link })
    ] }) })
  ] });
}
function XR({ session: e }) {
  const t = bl[e.state];
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
function p4(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(QR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(XR, { session: e.session });
}
const ZR = "_block_1yy2v_3", ex = "_list_1yy2v_9", tx = "_line_1yy2v_14", Cn = {
  block: ZR,
  list: ex,
  line: tx
}, nx = { warn: "warning", ok: "ok" };
function ax({ kind: e }) {
  const t = nx[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function rx({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${Cn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(ax, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function y4({ lines: e, label: t = "Agent input" }) {
  return /* @__PURE__ */ n("div", { className: `${Cn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Cn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(rx, { line: a }, `${r}-${a.text}`)) }) });
}
const lx = "_band_tt7hp_1", ox = "_head_tt7hp_8", ix = "_cell_tt7hp_19", sx = "_index_tt7hp_35", cx = "_title_tt7hp_42", dx = "_note_tt7hp_48", ux = "_cellTitle_tt7hp_53", hx = "_cellBody_tt7hp_58", mx = "_tag_tt7hp_64", Re = {
  band: lx,
  head: ox,
  cell: ix,
  index: sx,
  title: cx,
  note: dx,
  cellTitle: ux,
  cellBody: hx,
  tag: mx
}, Pa = 4;
function N4({ index: e, title: t, note: a, cells: r }) {
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
const wx = "_tag_1yuvz_2", _x = "_link_1yuvz_14", wn = {
  tag: wx,
  link: _x
};
function gl({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: wn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${wn.tag} ${wn.link}`, href: T(t), children: e });
}
const fx = "_eyebrow_m8swv_2", vx = "_link_m8swv_10", qa = {
  eyebrow: fx,
  link: vx
};
function rn({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: qa.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${qa.link} ward-target`, href: T(t), children: e }) });
}
const bx = "_figure_qz9i7_2", gx = "_media_qz9i7_9", px = "_caption_qz9i7_35", _n = {
  figure: bx,
  media: gx,
  caption: px
};
function yx(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Sn(e) {
  return /* @__PURE__ */ i("figure", { className: _n.figure, children: [
    /* @__PURE__ */ n("div", { className: _n.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(yx, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: _n.caption, children: e.caption })
  ] });
}
function $t(e) {
  return `h${e}`;
}
function Nx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const kx = "_prose_1fxb9_2", $x = "_anchor_1fxb9_79", pl = {
  prose: kx,
  anchor: $x
};
function Rn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: pl.prose, children: e });
}
function k4({ level: e, children: t, id: a }) {
  const r = $t(e), l = a ?? Nx(t);
  return /* @__PURE__ */ i(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${pl.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const Cx = "_list_176jq_2", Sx = "_pair_176jq_8", Rx = "_term_176jq_14", xx = "_value_176jq_19", Lt = {
  list: Cx,
  pair: Sx,
  term: Rx,
  value: xx
};
function Tx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Lt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: Lt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Lt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Lt.value, children: t.value })
  ] }, t.term)) });
}
const Lx = "_nav_sgeyg_2", Mx = "_item_sgeyg_6", Ax = "_link_sgeyg_13", Ex = "_note_sgeyg_30", Mt = {
  nav: Lx,
  item: Mx,
  link: Ax,
  note: Ex
};
function Ix({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Mt.nav, children: /* @__PURE__ */ n(yw, { children: t.map((a) => /* @__PURE__ */ i("li", { className: Mt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Mt.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Mt.note, children: a.note })
  ] }, a.href)) }) });
}
const Bx = "_header_kelio_2", Px = "_skip_kelio_14", qx = "_brand_kelio_39", Ox = "_list_kelio_46", Dx = "_link_kelio_56", at = {
  header: Bx,
  skip: Px,
  brand: qx,
  list: Ox,
  link: Dx
};
function $4({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: o = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: at.header, children: [
    /* @__PURE__ */ n("a", { className: at.skip, href: `#${l}`, children: o }),
    /* @__PURE__ */ n("a", { className: `${at.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: at.nav, children: /* @__PURE__ */ n("ul", { className: at.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${at.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const Hx = "_footer_1jb5e_2", Fx = "_note_1jb5e_12", zx = "_list_1jb5e_18", jx = "_link_1jb5e_27", At = {
  footer: Hx,
  note: Fx,
  list: zx,
  link: jx
};
function C4({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: At.footer, children: [
    /* @__PURE__ */ n("p", { className: At.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: At.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${At.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const Wx = "_intro_13128_2", Kx = "_title_13128_9", Gx = "_lead_13128_17", fn = {
  intro: Wx,
  title: Kx,
  lead: Gx
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
const Ux = "_section_u0k7p_2", Vx = "_head_u0k7p_13", Yx = "_titles_u0k7p_21", Jx = "_title_u0k7p_21", Qx = "_link_u0k7p_34", ft = {
  section: Ux,
  head: Vx,
  titles: Yx,
  title: Jx,
  link: Qx
};
function Xx({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const o = $t(l);
  return /* @__PURE__ */ i("div", { className: ft.head, children: [
    /* @__PURE__ */ i("div", { className: ft.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(rn, { children: a }),
      /* @__PURE__ */ n(o, { className: ft.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ft.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function S4({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: o = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: ft.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(Xx, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: o }),
    t
  ] });
}
const Zx = "_split_1ycaa_2", eT = "_main_1ycaa_10", tT = "_aside_1ycaa_15", vn = {
  split: Zx,
  main: eT,
  aside: tT
};
function nT({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: vn.split, children: [
    /* @__PURE__ */ n("div", { className: vn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: vn.aside, "aria-label": a, children: t })
  ] });
}
const aT = "_hero_ehbct_2", rT = "_text_ehbct_11", lT = "_visual_ehbct_23", oT = "_title_ehbct_28", iT = "_lead_ehbct_36", sT = "_actions_ehbct_42", cT = "_action_ehbct_42", dT = "_primary_ehbct_63", uT = "_secondary_ehbct_72", Ie = {
  hero: aT,
  text: rT,
  visual: lT,
  title: oT,
  lead: iT,
  actions: sT,
  action: cT,
  primary: dT,
  secondary: uT
};
function hT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ie.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ie.action} ${a === 0 ? Ie.primary : Ie.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function mT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ie.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ie.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ie.lead, children: a }),
    /* @__PURE__ */ n(hT, { actions: r })
  ] });
}
function R4({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ie.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(mT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ie.visual, children: e })
  ] });
}
const wT = "_chain_w2k2l_2", _T = "_step_w2k2l_12", fT = "_arrow_w2k2l_19", vT = "_box_w2k2l_24", Et = {
  chain: wT,
  step: _T,
  arrow: fT,
  box: vT
};
function x4({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: Et.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ i("li", { className: Et.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: Et.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: Et.box, children: r })
  ] }, l)) });
}
const bT = "_card_1u2gr_2", gT = "_featured_1u2gr_20", pT = "_media_1u2gr_28", yT = "_body_1u2gr_32", NT = "_title_1u2gr_48", kT = "_link_1u2gr_60", $T = "_summary_1u2gr_78", CT = "_tags_1u2gr_84", ST = "_cta_1u2gr_90", ve = {
  card: bT,
  featured: gT,
  media: pT,
  body: yT,
  title: NT,
  link: kT,
  summary: $T,
  tags: CT,
  cta: ST
};
function yl({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: ve.media, children: /* @__PURE__ */ n(Sn, { ratio: t, children: e }) });
}
function RT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = $t(a);
  return /* @__PURE__ */ n(r, { className: ve.title, children: /* @__PURE__ */ n("a", { className: ve.link, href: T(e), children: t }) });
}
function Nl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(rn, { children: e }),
    /* @__PURE__ */ n(RT, { ...t })
  ] });
}
function kl({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: ve.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: ve.tags, children: t.map((a) => /* @__PURE__ */ n(gl, { label: a }, a)) })
  ] });
}
function T4({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...o }) {
  return /* @__PURE__ */ i("article", { className: ve.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(yl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n(Nl, { eyebrow: a, ...o }),
      /* @__PURE__ */ n(kl, { summary: r, tags: l })
    ] })
  ] });
}
function L4({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: o, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${ve.card} ${ve.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(yl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n(Nl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(kl, { summary: r, tags: l }),
      o === void 0 ? null : /* @__PURE__ */ i("span", { className: ve.cta, "aria-hidden": "true", children: [
        o,
        " →"
      ] })
    ] })
  ] });
}
const xT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function $l(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${xT[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const TT = "_row_1peme_2", LT = "_title_1peme_15", MT = "_link_1peme_23", AT = "_meta_1peme_40", ET = "_summary_1peme_46", wt = {
  row: TT,
  title: LT,
  link: MT,
  meta: AT,
  summary: ET
};
function M4({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: o = 3 }) {
  const s = $t(o);
  return /* @__PURE__ */ i("article", { className: wt.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: wt.title, children: /* @__PURE__ */ n("a", { className: wt.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: wt.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: $l(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: wt.summary, children: l })
  ] });
}
const IT = "_list_dd8kj_2", BT = "_item_dd8kj_16", Oa = {
  list: IT,
  item: BT
};
function A4({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Oa.list, role: "list", "aria-label": a, "data-rules": t, children: ja.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Oa.item, children: r }, l)) });
}
const PT = "_page_i3r2z_2", qT = "_aside_i3r2z_8", OT = "_tags_i3r2z_13", Jn = {
  page: PT,
  aside: qT,
  tags: OT
};
function DT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Jn.tags, children: e.map((t) => /* @__PURE__ */ n(gl, { label: t }, t)) });
}
function HT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function FT(e) {
  return e.filter(HT).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(DT, { labels: a })
  }));
}
function zT({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Jn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(Tx, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(Ix, { label: a, links: t })
  ] });
}
function Cl({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Rn, { children: l }) : /* @__PURE__ */ n(nT, { asideLabel: r, aside: /* @__PURE__ */ n(zT, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Rn, { children: l }) });
}
function E4({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: o, period: s, focus: c, stack: d, related: u }) {
  const h = FT([
    ["Role", o],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Jn.page, children: [
    /* @__PURE__ */ n(Yn, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(Cl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const jT = "_page_1junb_2", WT = "_source_1junb_8", KT = "_shots_1junb_30", xn = {
  page: jT,
  source: WT,
  shots: KT
};
function GT({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Sn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: xn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Sn, { ...a, ratio: t }) }, r)) });
}
function I4(e) {
  const { title: t, summary: a, children: r, source: l, facts: o = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: xn.page, children: [
    /* @__PURE__ */ n(Yn, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: xn.source, href: T(l.href), children: l.label }) }),
    /* @__PURE__ */ n(GT, { shots: s, ratio: c }),
    /* @__PURE__ */ n(Cl, { facts: o, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function UT(e) {
  const t = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const o = a[a.length - 1];
    (o === void 0 ? t : o.children).push(l), a.push(l);
  }
  return t;
}
const VT = "_article_drsu4_2", YT = "_meta_drsu4_8", JT = "_tldr_drsu4_14", QT = "_tldrLabel_drsu4_21", XT = "_tldrText_drsu4_27", ZT = "_toc_drsu4_40", eL = "_tocTitle_drsu4_44", tL = "_tocList_drsu4_50", nL = "_tocLink_drsu4_65", Be = {
  article: VT,
  meta: YT,
  tldr: JT,
  tldrLabel: QT,
  tldrText: XT,
  toc: ZT,
  tocTitle: eL,
  tocList: tL,
  tocLink: nL
};
function aL({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Be.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: $l(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function rL({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Be.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Be.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Be.tldrText, children: e })
  ] });
}
function Sl({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Be.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Be.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(Sl, { nodes: t.children })
  ] }, t.id)) });
}
function lL({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Be.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Be.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(Sl, { nodes: UT(e) })
  ] });
}
function B4({ title: e, date: t, children: a, minutes: r, tldr: l, headings: o = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Be.article, children: [
    /* @__PURE__ */ n(Yn, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(aL, { date: t, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ n(rL, { children: l }),
    /* @__PURE__ */ n(lL, { headings: o }),
    /* @__PURE__ */ n(Rn, { children: a })
  ] });
}
const oL = 220;
function iL(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function P4(e) {
  return Math.max(1, Math.ceil(iL(e) / oL));
}
const Vt = { w: 184, h: 96 }, ct = { w: 152, h: 48 }, Yt = 16, It = (e) => Math.round(e * 10) / 10;
function Rl(e) {
  return { x: Yt + e.col * Vt.w, y: Yt + e.row * Vt.h, w: ct.w, h: ct.h };
}
function sL(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Yt + t * Vt.w + ct.w, h: 2 * Yt + a * Vt.h + ct.h };
}
function Da(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function cL(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, l = t.x + t.w / 2 - a, o = t.y + t.h / 2 - r, s = Da(e, l, o), c = 1 - Da(t, l, o);
  return { x1: It(a + l * s), y1: It(r + o * s), x2: It(a + l * c), y2: It(r + o * c) };
}
function dL() {
  const [e, t] = v(!1);
  return S(() => {
    var l;
    const a = (l = window.matchMedia) == null ? void 0 : l.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (o) => t(o.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const uL = "_diagram_76e4t_2", hL = "_label_76e4t_9", mL = "_svg_76e4t_14", wL = "_node_76e4t_20", _L = "_edge_76e4t_33", fL = "_arrow_76e4t_38", vL = "_controls_76e4t_63", bL = "_live_76e4t_70", gL = "_steps_76e4t_77", Me = {
  diagram: uL,
  label: hL,
  svg: mL,
  node: wL,
  edge: _L,
  arrow: fL,
  controls: vL,
  live: bL,
  steps: gL
};
function pL({ nodes: e, edges: t, lit: a, marker: r }) {
  const l = new Map(e.map((o) => [o.id, Rl(o)]));
  return t.map((o) => {
    const s = l.get(o.from), c = l.get(o.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(o.from) && a(o.to);
    return /* @__PURE__ */ n("line", { className: Me.edge, "data-active": d, ...cL(s, c), markerEnd: `url(#${r})` }, `${o.from}>${o.to}`);
  });
}
function yL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = Rl(a);
    return /* @__PURE__ */ i("g", { className: Me.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + ct.w / 2, y: r.y + ct.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Ha({ label: e, to: t, count: a, go: r, status: l }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: l, children: e }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => r(t), children: e });
}
function NL({ at: e, count: t, text: a, go: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { className: Me.controls, children: [
    /* @__PURE__ */ n(Ha, { label: "Back", to: e - 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n(Ha, { label: "Next", to: e + 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n("p", { className: Me.live, id: l, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function q4({ label: e, nodes: t, edges: a, steps: r }) {
  const l = dL() && r.length > 0, [o, s] = v(0), c = y(), d = (h) => l && r[o].nodes.includes(h), u = sL(t);
  return /* @__PURE__ */ i("figure", { className: Me.diagram, "data-live": l, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Me.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Me.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Me.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(pL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(yL, { nodes: t, lit: d })
    ] }),
    l ? /* @__PURE__ */ n(NL, { at: o, count: r.length, text: r[o].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Me.steps, children: r.map((h, m) => /* @__PURE__ */ n("li", { "aria-current": l && m === o ? "step" : void 0, children: h.text }, m)) })
  ] });
}
export {
  EL as ACCENT_PRESETS,
  l3 as ActionStack,
  l4 as ActivityConsole,
  zL as AdminIcon,
  Sg as AgentCard,
  q4 as AnimatedDiagram,
  WL as AppShell,
  j3 as AppearanceStrip,
  B4 as Article,
  N4 as Band,
  a3 as BarChart,
  Gf as BoardColumn,
  N3 as BoardFootnote,
  k3 as BoardHeader,
  HL as BoardIcon,
  m3 as BoardScroller,
  b as Btn,
  AL as CHIP_ROLES,
  BL as CONTRASTS,
  rl as CREDENTIAL_COLUMNS,
  e3 as Callout,
  W3 as CapabilityRow,
  _3 as CardGrid,
  E4 as CaseStudy,
  w4 as ChatMessage,
  _4 as ChatWorking,
  nr as Checkbox,
  w as Chip,
  st as ClampText,
  o4 as ClarificationRow,
  E3 as ClauseRuleRow,
  A3 as ClauseRules,
  Or as ColourLadder,
  K3 as ComponentRow,
  i4 as Composer,
  C3 as ConfigRow,
  $3 as ConfigRowHead,
  Dn as ConnectionMark,
  r4 as ConsoleAnnounceProvider,
  m4 as Conversation,
  rw as CostMeter,
  U3 as CredentialRow,
  G3 as CredentialRowHead,
  s4 as CriteriaList,
  wc as Crumb,
  IL as DENSITIES,
  f4 as DeliveryHealth,
  v3 as DeniedState,
  OL as DisabledScope,
  B3 as DryRunRail,
  uf as EmptyState,
  V3 as EnvCard,
  rn as Eyebrow,
  Tx as FactList,
  L4 as FeaturedCard,
  I as Field,
  Sn as Figure,
  f3 as FilteredEmpty,
  x4 as FlowChain,
  KL as FoldText,
  u3 as FormStack,
  an as GateChecklist,
  c4 as GateLadder,
  bw as Grid,
  q3 as HandoffRuleRow,
  P3 as HandoffRules,
  R4 as Hero,
  DL as HomeIcon,
  t3 as InfoTip,
  S3 as ItemDrawer,
  Y3 as KeyPanel,
  Vl as LIVE_EVENT_TYPES,
  Vb as LegacyBoardColumn,
  x3 as LegacyBoardHeader,
  T3 as LegacyConfigRow,
  M3 as LegacyItemDrawer,
  Fb as LegacyOverCapNote,
  L3 as LegacyPreviewRail,
  Br as LegacyWorkCard,
  Ix as LinkList,
  Pe as LiveIndicator,
  b3 as LoadFailed,
  y3 as Loading,
  dl as MCP_SERVER_COLUMNS,
  On as Mark,
  Q3 as MarkUpload,
  Ke as Marker,
  Z3 as McpServerRow,
  X3 as McpServerRowHead,
  fr as Menu,
  mr as MenuButton,
  O3 as NewStreamModal,
  _f as OverCapNote,
  En as OverflowRow,
  ut as Overlay,
  GL as OwedCard,
  I3 as PARTIAL_STEP_REASON,
  ul as POLICY_CHIP_WIDTH,
  s3 as PageFrame,
  ZL as PageHeader,
  Yn as PageIntro,
  n3 as PeriodPicker,
  yw as PlainList,
  e4 as PolicyRow,
  M4 as PostRow,
  R3 as PreviewRail,
  T4 as ProjectCard,
  I4 as ProjectPage,
  Rn as Prose,
  k4 as ProseHeading,
  un as ROLE_MATRIX_COLUMNS,
  Jr as RULE_ACTIONS,
  Sr as Radio,
  v4 as ReadyChecklist,
  d3 as RecordSection,
  d4 as RequeueSheet,
  u4 as ResolveBlock,
  b4 as ResolvedFieldRow,
  t4 as RoleMatrixRow,
  g4 as RoutingTable,
  D3 as RuleRow,
  n4 as RunbookSteps,
  Ul as STREAM_STEPS,
  S4 as Section,
  h3 as SectionBand,
  ga as SectionHeader,
  kr as SegmentedControl,
  dr as Select,
  p4 as SessionRow,
  JL as Sidebar,
  jL as SidebarFoldButton,
  C4 as SiteFooter,
  $4 as SiteHeader,
  nT as SplitLayout,
  H3 as StageColumn,
  w3 as StageGrid,
  h4 as StageHistory,
  aN as StageListEditor,
  UL as StageSteps,
  g3 as StaleStrip,
  en as StatStrip,
  o3 as StatTiles,
  XL as StreamAvatar,
  F3 as StreamRow,
  FL as StudioIcon,
  c3 as SubjectRail,
  Xe as Switch,
  YL as TabLinks,
  r3 as TableHead,
  VL as Tabs,
  gl as Tag,
  A4 as TextList,
  xL as ThemeProvider,
  z3 as ToolRow,
  i3 as TopBar,
  $_ as Tree,
  Mr as TreeRow,
  y4 as TypedInputBlock,
  Di as UNSAFE_HREF,
  a4 as ValidationList,
  SL as VisibilityProvider,
  RL as Visible,
  ML as WARD_VERSION,
  nn as WorkCard,
  p3 as WriteUnavailableStrip,
  WR as agoSince,
  El as clock,
  NN as colourStatus,
  ne as count,
  se as duration,
  Tn as elapsed,
  LL as eventSourceTransport,
  $l as formatDate,
  $t as headingTag,
  Qt as isStreamStep,
  yt as isValidatedStreamStep,
  tp as ladderValidation,
  z0 as mcpConnectionChip,
  H0 as mcpToolName,
  le as money,
  ye as ms,
  Ar as ordered,
  Ka as ratio,
  P4 as readTime,
  s$ as restartLabel,
  T as safeHref,
  Nx as slug,
  me as stamp,
  Ln as stream,
  PL as streamChip,
  In as streamChipProps,
  ke as streamColour,
  Ql as streamHex,
  Ft as streamInitials,
  Yl as streamVars,
  QL as uniqueStreamInitials,
  or as useAnchoredPanel,
  Bt as useBorderFlash,
  qe as useDisabledScope,
  Wl as useFocusTrap,
  qL as useLiveFeed,
  TL as useReturnFocus,
  Jt as useRovingTabindex,
  Mn as useTicker,
  Il as useVisible,
  P as v,
  J3 as validateMark,
  Zt as validatedStep,
  Ua as validatedStreamSteps,
  iL as wordCount
};
