import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as za, useContext as pe, createContext as $e, useState as f, useEffect as S, useCallback as Z, useRef as v, useLayoutEffect as Qe, useId as y, Fragment as ja, isValidElement as Mo, Children as Wa } from "react";
import { createPortal as Ao, flushSync as Ka } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Xn = (e) => String(e).padStart(2, "0");
function Ln(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Xn(t % 60)}s` : `${Math.floor(a / 60)}h ${Xn(a % 60)}m`;
}
const Eo = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const t = Eo.formatToParts(new Date(e)), a = (r) => {
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
function Ua(e, t) {
  return `${e} / ${t}`;
}
const Io = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Bo(e) {
  return Io.format(new Date(e));
}
const Ga = $e(/* @__PURE__ */ new Set());
function AL({ hidden: e, children: t }) {
  const a = za(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ga.Provider, { value: a, children: t });
}
function Po(e) {
  return !pe(Ga).has(e);
}
function EL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Po(e) ? t : a });
}
const qo = "(prefers-color-scheme: dark)", Oo = "(prefers-contrast: more)";
function Zn(e) {
  return typeof window.matchMedia == "function" ? window.matchMedia(e) : null;
}
function ea(e, t) {
  const [a, r] = f(() => {
    var o;
    return ((o = Zn(e)) == null ? void 0 : o.matches) === !0;
  });
  return S(() => {
    const o = t ? Zn(e) : null;
    if (!o) return;
    const l = () => r(o.matches);
    return l(), o.addEventListener("change", l), () => o.removeEventListener("change", l);
  }, [e, t]), a;
}
function Ct(e, t) {
  S(() => {
    if (t === null) return;
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Do(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Ho(e, t) {
  return e === "system" ? t ? "more" : null : e === "more" ? "more" : null;
}
function IL({ theme: e, accent: t = "green", density: a = "comfortable", contrast: r = "standard", children: o }) {
  const l = ea(qo, e === "system"), s = ea(Oo, r === "system");
  return Ct("data-theme", Do(e, l)), Ct("data-accent", t), Ct("data-density", a), Ct("data-contrast", Ho(r, s)), /* @__PURE__ */ n(x, { children: o });
}
const Fo = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function zo(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function jo(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Wo(e, t, a, r) {
  return e.shiftKey ? zo(t, a) ? r : void 0 : document.activeElement === r || jo(t) ? a : void 0;
}
function Ko(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const l = Wo(e, t, r, o);
  l && (e.preventDefault(), l.focus());
}
function Uo(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Fo));
      Ko(a, e.current, r);
    },
    [e]
  ) };
}
function BL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, l;
      (l = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || l.call(o);
    };
  }, [t, e]);
}
const ta = { ArrowUp: -1, ArrowDown: 1 }, na = { ArrowLeft: -1, ArrowRight: 1 }, Go = (e, t, a) => Math.min(a, Math.max(t, e));
function Vo(e, t) {
  if (t !== "horizontal" && e in ta) return ta[e];
  if (t !== "vertical" && e in na) return na[e];
}
function Qt({ orientation: e = "both" } = {}) {
  const [t, a] = f(0), r = v(/* @__PURE__ */ new Map()), o = v(!1);
  Qe(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], m = o.current;
    o.current = !1, a(h), m && ((_ = r.current.get(h)) == null || _.focus());
  });
  const l = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const m = Math.max(0, h.indexOf(t)), _ = Vo(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Go(m + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const PL = (e, t, a) => {
  const r = new EventSource(e), o = (l) => a.onEvent(l.data, l.lastEventId, l.type);
  r.onmessage = o;
  for (const l of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(l, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, qL = "0.2.0", OL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Yo = [1, 2, 3, 4, 5, 6], Va = [1, 2, 3], Jo = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], DL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], HL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], FL = [{ name: "standard", label: "Standard" }, { name: "more", label: "High" }], q = {
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
function Mn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Xt(e) {
  return Yo.includes(e);
}
function yt(e) {
  return Va.includes(e);
}
function Qo(e) {
  if (!Xt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function zL(e) {
  if (!Xt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Xo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Zo(e) {
  if (!Xt(e)) throw new Error("unvalidated stream step");
  return Xo[e];
}
function aa(e) {
  return typeof e != "string" ? null : Jo.includes(e) ? e : null;
}
function el(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function tl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function nl(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function al(e, t, a) {
  const r = el(e);
  if (r === null) return null;
  const o = aa(a) ?? aa(r.type);
  return o === null ? null : { ...r, type: o, id: tl(r, t), at: nl(r) };
}
function rl(e, t) {
  return e >= ye.staleAfter ? "stale" : e >= ye.heartbeat && t === "live" ? "reconnecting" : null;
}
function ol(e, t, a) {
  return e >= ye.heartbeat && !t && a !== null;
}
function jL(e, t) {
  const [a, r] = f("reconnecting"), [o, l] = f(null), s = v(/* @__PURE__ */ new Map()), c = v(0), d = v(""), u = v(0), h = v(null), m = v(0), _ = v(0), N = v(!1), k = v("reconnecting"), M = Z((A) => {
    k.current = A, r(A);
  }, []), P = Z(() => {
    c.current = Date.now();
  }, []), we = Z((A) => {
    for (const [V, Se] of s.current)
      (Se === "*" || A.itemKey === Se) && V(A);
  }, []), ae = Z(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (A, V, Se) => {
        const Ue = al(A, V, Se);
        Ue !== null && (Ue.id && (d.current = Ue.id), P(), N.current = !1, M("live"), l(Ue.at), we(Ue));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, P(), M("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && M("reconnecting");
        const A = Math.min(ye.reconnectBase * 2 ** u.current, ye.reconnectMax);
        u.current += 1, m.current = window.setTimeout(ae, A);
      }
    });
  }, [we, M, P, t, e]), Ce = Z((A) => {
    N.current = !0, A.close(), h.current = null, m.current = window.setTimeout(ae, ye.reconnectBase);
  }, [ae]), Ze = Z((A, V) => (s.current.set(V, A), () => {
    s.current.delete(V);
  }), []);
  return S(() => (P(), ae(), _.current = window.setInterval(() => {
    const A = Date.now() - c.current, V = rl(A, k.current);
    V && M(V);
    const Se = h.current;
    ol(A, N.current, Se) && Ce(Se);
  }, ye.tick), () => {
    var A;
    window.clearInterval(_.current), window.clearTimeout(m.current), N.current = !1, (A = h.current) == null || A.close(), h.current = null;
  }), [ae, Ce, M, P]), { connection: a, lastEventAt: o, subscribe: Ze };
}
function An(e, t) {
  const a = new Date(e).getTime(), [r, o] = f(() => Date.now());
  return S(() => {
    if (!t) return;
    const l = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    l();
    const s = window.setInterval(l, ye.tick);
    return document.addEventListener("visibilitychange", l), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", l);
    };
  }, [t, a]), Math.max(0, r - a);
}
const ll = { blue: "running", orange: "waiting", green: "done" };
function il() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ra(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Pt(e, t) {
  const a = v(0), r = Z((o) => {
    const l = o ?? t, s = e.current;
    s !== null && l !== void 0 && (il() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${ll[l]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ra(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => ra(s), ye.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const sl = "_root_1otpc_2", cl = {
  root: sl
};
function dl(e, t, a, r, o) {
  const l = [Ln(t)];
  return e || l.push(`as of ${Bo(a)}`), r && l.push(`turn ${r[0]}/${r[1]}`), o && l.push(o.label), l;
}
function Pe({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", l = An(e, o), s = (t == null ? void 0 : t.at) ?? e, c = dl(o, l, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${cl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const ul = "_app_ge95k_1", hl = "_side_ge95k_35", ml = "_sideTop_ge95k_46", wl = "_sideBody_ge95k_60", _l = "_foldSlot_ge95k_86", fl = "_iconRail_ge95k_110", vl = "_railItem_ge95k_119", bl = "_railIcon_ge95k_140", pl = "_railDot_ge95k_145", gl = "_railLetter_ge95k_151", yl = "_main_ge95k_157", Nl = "_rail_ge95k_119", kl = "_page_ge95k_179", $l = "_headerRow_ge95k_202", Cl = "_sidebarToggle_ge95k_209", Sl = "_headerSlot_ge95k_214", Rl = "_headerAction_ge95k_219", xl = "_drawerSide_ge95k_224", Tl = "_root_ge95k_271", Ll = "_topbar_ge95k_278", Ml = "_mark_ge95k_289", Al = "_brand_ge95k_296", El = "_tagline_ge95k_302", Il = "_identity_ge95k_308", Bl = "_tools_ge95k_309", Pl = "_nav_ge95k_319", ql = "_metadata_ge95k_326", Ol = "_actor_ge95k_341", Dl = "_detail_ge95k_342", Hl = "_content_ge95k_387", Fl = "_toolsPanel_ge95k_403", zl = "_skip_ge95k_429", $ = {
  app: ul,
  side: hl,
  sideTop: ml,
  sideBody: wl,
  foldSlot: _l,
  iconRail: fl,
  railItem: vl,
  railIcon: bl,
  railDot: pl,
  railLetter: gl,
  main: yl,
  rail: Nl,
  page: kl,
  headerRow: $l,
  sidebarToggle: Cl,
  headerSlot: Sl,
  headerAction: Rl,
  drawerSide: xl,
  root: Tl,
  topbar: Ll,
  mark: Ml,
  brand: Al,
  tagline: El,
  identity: Il,
  tools: Bl,
  nav: Pl,
  metadata: ql,
  actor: Ol,
  detail: Dl,
  content: Hl,
  toolsPanel: Fl,
  skip: zl
};
function dt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const jl = "_scope_1an6i_2", Wl = {
  scope: jl
}, Ya = $e(null);
function WL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Wl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ya.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function qe() {
  return pe(Ya);
}
function Zt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : dt(e, t.reasonId);
}
const Kl = "_btn_1mk1f_2", Ul = "_primary_1mk1f_14", Gl = "_destructive_1mk1f_25", Vl = "_secondary_1mk1f_35", Yl = "_ghost_1mk1f_40", Jl = "_overflow_1mk1f_49", Ql = "_sm_1mk1f_56", Xl = "_disabled_1mk1f_60", Zl = "_withReason_1mk1f_68", ei = "_reason_1mk1f_74", ot = {
  btn: Kl,
  primary: Ul,
  destructive: Gl,
  secondary: Vl,
  ghost: Yl,
  overflow: Jl,
  sm: Ql,
  disabled: Xl,
  withReason: Zl,
  reason: ei
};
function ti(e, t, a, r) {
  const o = t === "sm" ? [ot.sm, "ward-btn--sm"] : [], l = a ? [ot.disabled] : [];
  return [ot.btn, ot[e], "ward-btn", `ward-btn--${e}`, ...o, ...l, r ?? ""].filter(Boolean).join(" ");
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
function oi(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function li(e, t, a) {
  return oi(e.describedBy, t && a);
}
function ii({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${ot.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
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
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), l = ri(e, t), s = y(), c = di(l, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ti(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: l,
        "aria-describedby": li(e, l, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ni(a, e.controls),
        children: si(e)
      }
    ),
    /* @__PURE__ */ n(ii, { id: s, reason: l, shown: c === Ja })
  ] });
}
function di(e, t) {
  return e && !t ? Ja : ja;
}
function Ja({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${ot.withReason} ward-btn-withReason`, children: e });
}
let En = "none";
function ui(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (En = "key");
}
typeof document < "u" && (document.addEventListener("keydown", ui, !0), document.addEventListener("pointerdown", () => {
  En = "pointer";
}, !0));
function hi() {
  return En === "key";
}
function pt(e) {
  const [t, a] = f(() => {
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
const mi = "_scrim_1cawq_2", wi = "_drawer_1cawq_10", _i = "_sheet_1cawq_14", fi = "_modal_1cawq_18", vi = "_panel_1cawq_23", bi = "_start_1cawq_44", pi = "_header_1cawq_67", gi = "_title_1cawq_75", yi = "_body_1cawq_79", Ni = "_close_1cawq_106", Ae = {
  scrim: mi,
  drawer: wi,
  sheet: _i,
  modal: fi,
  panel: vi,
  start: bi,
  header: pi,
  title: gi,
  body: yi,
  close: Ni
}, ki = $e(null), Ht = [], Ft = /* @__PURE__ */ new Map();
function $i(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ci(e, t) {
  let a = Ft.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Ft.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
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
    const a = Ft.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Ft.delete(t)));
  }
}
function Ti(e, t) {
  const a = { root: e, claims: [] };
  return Ht.push(a), Ri(a, t), a;
}
function Li(e) {
  const t = Ht.indexOf(e);
  t >= 0 && Ht.splice(t, 1), xi(e);
}
function oa(e) {
  return e !== null && Ht.at(-1) === e;
}
function Mi(e, t, a) {
  const r = v(null), o = v(a);
  return o.current = a, S(() => {
    const l = e.current;
    if (!l) return;
    const s = document.activeElement, c = Ti(l, t);
    return r.current = c, () => {
      var u, h;
      const d = oa(c);
      Li(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Z(() => oa(r.current), []);
}
function Ai(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ei(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ii({ props: e, titleId: t }) {
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
  const t = pe(ki);
  return e ?? t ?? document.body;
}
function ut(e) {
  const t = v(null), a = v(null), r = y(), o = qi(e.container), l = pt("(min-width: 768px)"), s = Ai(e.kind, l), c = Ei(e, r), d = Uo(a), [u] = f(hi), h = Mi(t, o, e.returnFocusTo), m = Z(() => {
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
  }, [m]), Ao(
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
              /* @__PURE__ */ n(Ii, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Oi = /^([a-z][a-z0-9+.-]*):/i, Di = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Hi = "#";
function Fi(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Oi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function T(e) {
  const t = Fi(e);
  return t === void 0 || Di.has(t) ? e : Hi;
}
function zi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Qa(e) {
  const t = zi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ji(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Qa(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const l of [a, ...a.children]) o == null || o.observe(l);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function Wi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function Ki(e, t, a) {
  Qe(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const l = Wi(r, o);
    l !== null && (r.scrollLeft = Math.max(0, l)), Qa(r);
  }, [e, t, a]);
}
const Ui = "_row_11g8i_2", Gi = {
  row: Ui
};
function Vi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function In({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: l, className: s, ...c }) {
  const d = v(null), u = l ?? d;
  return ji(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Gi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Vi(o, r), ...c, children: t });
}
const Yi = "_icon_1ylqy_2", Ji = {
  icon: Yi
};
function Nt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Ji.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function KL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function UL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function GL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function VL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Qi() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Xa = "ward:sidebar-collapsed", Xi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Zi() {
  try {
    return window.localStorage.getItem(Xa) === "true";
  } catch {
    return !1;
  }
}
function es(e) {
  try {
    window.localStorage.setItem(Xa, String(e));
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
  const [t, a] = f(Zi), r = () => {
    es(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (l) => {
      var c;
      if (!as(l)) return;
      const s = l.target instanceof Element ? l.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function os() {
  const e = pt("(max-width: 767.98px)"), t = pt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function ls(e) {
  const t = e === "phone", a = y(), r = v(null), [o, l] = f(!1);
  return o && !t && l(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => l(!o), close: () => l(!1) };
}
function is({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e }),
    nr(t) && /* @__PURE__ */ n("span", { className: $.headerAction, children: t })
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
  var o;
  if (ss(a.open, a.close), !a.open) return null;
  const r = (l) => {
    l.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ut, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: Za(e, !1) }) });
}
function ds(e) {
  const [t, a] = f(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function us(e, t) {
  const a = rs(e === "wide" && !t), r = ds(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function hs(e, t) {
  const a = us(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ws(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const ms = (e) => e.collapsed && e.drawsStrip;
function ws(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const la = (e) => e ? "" : void 0;
function Za(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function er({ fold: e }) {
  const t = e.collapsed ? "Expand sidebar" : "Collapse sidebar";
  return /* @__PURE__ */ n("span", { className: $.foldSlot, "data-ward-tip": t, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Qi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t })
  ] }) });
}
function _s({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(er, { fold: e }) });
}
const tr = $e(null);
function YL() {
  const e = pe(tr);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(er, { fold: e });
}
function fs({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Mn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function vs({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: $.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(fs, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function bs({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const l = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(_s, { fold: r, inSidebar: o && !l }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: l, children: Za(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(vs, { items: a ?? [], label: t })
  ] });
}
const nr = (e) => e != null;
function ps(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: l, iconRail: s, pageFill: c } = e, d = nr(l), u = os(), h = ls(u), m = hs(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(m.collapsed), "data-consumer-fold": la(ms(m)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(tr.Provider, { value: m, children: /* @__PURE__ */ n(bs, { sidebar: t, label: _, iconRail: s, fold: m, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(is, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: $.page, "data-fill": la(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: $.rail, children: l }),
    /* @__PURE__ */ n(cs, { sidebar: t, label: _, drawer: h })
  ] });
}
function gs({ destinations: e, active: t }) {
  const a = v(null);
  return Ki(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(In, { as: "nav", rowRef: a, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function pn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function ys({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(pn, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(pn, { value: t, className: $.detail })
  ] });
}
function Ns() {
  const e = pt("(max-width: 767.98px)"), t = y(), a = v(null), [r, o] = f(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
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
    /* @__PURE__ */ n(pn, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(gs, { destinations: e.destinations ?? [], active: e.active ?? "" }),
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
function JL(e) {
  return Rs(e) ? /* @__PURE__ */ n(ps, { ...e }) : /* @__PURE__ */ n(Ss, { ...e });
}
const xs = "_root_itg9o_2", Ts = "_row_itg9o_8", Ls = "_box_itg9o_14", Ms = "_label_itg9o_21", As = "_labelHidden_itg9o_26", Es = "_consequence_itg9o_44", Is = "_sample_itg9o_79", Ve = {
  root: xs,
  row: Ts,
  box: Ls,
  label: Ms,
  labelHidden: As,
  consequence: Es,
  sample: Is
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
  const o = e.consequence ? `${t}-note` : void 0, l = qs(e, a, r), s = l ? `${t}-reason` : void 0, c = Zt(dt(o, e.describedBy, s), r);
  return { noteId: o, reason: l, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? l } };
}
function Ds({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Hs({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.sample, "aria-hidden": "true", children: e }) : null;
}
function ar(e) {
  const t = y(), a = qe(), r = Bs(e, a), o = Os(e, t, r.disabled, a);
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
          onChange: (l) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, l.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ n("label", { htmlFor: t, className: e.labelHidden ? Ve.labelHidden : Ve.label, children: e.label }),
      /* @__PURE__ */ n(Hs, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Ds, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Ps, { id: o.noteId, text: e.consequence })
  ] });
}
const Fs = "_chip_pq6tb_2", zs = {
  chip: Fs
}, js = {
  gate: q.chip.gate,
  system: q.chip.system,
  write: q.chip.write,
  drift: q.chip.drift,
  done: q.chip.done,
  attention: q.chip.attention,
  failed: q.chip.failed,
  pending: q.chip.pending,
  running: q.chip.running,
  warn: q.chip.warn,
  meta: q.chip.meta,
  soft: q.chip.soft,
  quiet: q.chip.quiet,
  owed: q.chip.owed,
  neutral: q.chip.quiet,
  info: q.chip.running,
  success: q.chip.done,
  warning: q.chip.attention,
  danger: q.chip.failed
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
  const t = Mn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function w({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${zs.chip} ward-chip ward-chip--${e}`, style: Ws(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Us = "_clamp_zn74g_3", ia = {
  clamp: Us
};
function st({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? ia.clamp : `${ia.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Gs = "_root_1btz3_2", Vs = "_body_1btz3_10", Ys = "_toggle_1btz3_24", ln = {
  root: Gs,
  body: Vs,
  toggle: Ys
};
function QL({ children: e, lines: t = 3, label: a }) {
  const [r, o] = f(!1), l = y();
  return /* @__PURE__ */ i("div", { className: ln.root, children: [
    /* @__PURE__ */ n("div", { id: l, className: ln.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: ln.toggle, "aria-expanded": r, "aria-controls": l, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Js = "_root_1a4s8_2", Qs = "_words_1a4s8_16", Xs = "_title_1a4s8_23", Zs = "_actions_1a4s8_27", St = {
  root: Js,
  words: Qs,
  title: Xs,
  actions: Zs
};
function XL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
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
function oc({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: _t.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${_t.dot} ward-running` : _t.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: _t.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: rc[e.state] })
  ] });
}
function ZL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: _t.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(oc, { step: r, running: t }, r.label)) });
}
function en(e) {
  return typeof e == "number" && yt(e) ? e : null;
}
function ke(e, t) {
  const a = en(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Bn(e, t) {
  const a = en(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const lc = "_root_13eei_3", ic = "_nav_13eei_8", sc = "_list_13eei_16", cc = "_item_13eei_24", dc = "_link_13eei_44", uc = "_sep_13eei_54", hc = "_current_13eei_58", mc = "_chips_13eei_62", De = {
  root: lc,
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
    /* @__PURE__ */ n("ol", { className: De.list, children: e.map((r, o) => /* @__PURE__ */ i("li", { className: De.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(wc, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${De.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(w, { ...r }, r.label)) }) : null
  ] }) });
}
function rr(e, t, a) {
  const r = v(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (l) => {
      var s;
      (s = t.current) != null && s.contains(l.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const fc = 500;
function or(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function lr() {
  const e = v(""), t = v(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, fc), e.current);
}
const Rt = 4;
function vc(e, t, a) {
  const r = Math.max(0, a - e.bottom - Rt * 2), o = Math.max(0, e.top - Rt * 2);
  return t <= r || r >= o ? { top: e.bottom + Rt, maxHeight: r } : { top: e.top - Rt - Math.min(t, o), maxHeight: o };
}
function bc(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, l = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = l[r] || !l[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function pc(e, t, a, r) {
  return { ...vc(e, t.height, a.height), left: bc(e, t.width, a.width, r) };
}
function qt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function gc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function yc(e, t, a) {
  const r = gc(t, a);
  e.style.setProperty("--ward-anchor-width", qt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: r, box: o, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Nc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function sa(e, t, a, r) {
  const o = Nc(e), l = yc(e, t, r), s = pc(l.edges, l.box, l.view, a);
  Object.assign(e.style, { left: qt(s.left - l.box.left), top: qt(s.top - l.box.top), maxHeight: qt(s.maxHeight) }), o();
}
function kc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function ir(e, t, a = "start", r) {
  Qe(() => {
    const o = t.current, l = e.current;
    if (!o || !l) return;
    const s = kc(o), c = () => sa(o, l, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), Qe(() => {
    t.current && e.current && sa(t.current, e.current, a, r == null ? void 0 : r.current);
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
}, Ec = 7;
function Ic(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function ca(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Bc(e, t) {
  const [a, r] = f(e.defaultOpen === !0), [o, l] = f(""), [s, c] = f(() => ca(e.options, e.value)), d = (u) => {
    var h;
    Ka(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Ic(e.options, o),
    findable: e.options.length > Ec,
    show: () => {
      e.disabled || (l(""), c(ca(e.options, e.value)), r(!0));
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
function Pc(e, t) {
  const a = v(!1);
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
    const r = t(a), o = e.entries.findIndex((l) => l.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function sr(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Oc(e) {
  return { ...sr(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function cr(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
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
function Fc({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: Ne.option,
      onMouseDown: (l) => l.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: Ne.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: Ne.label, children: e.option.label })
      ]
    }
  );
}
function Pn(e, t) {
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
      "aria-activedescendant": Pn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: cr(e, sr(e), () => {
      })
    }
  );
}
function jc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const l = qc(t), s = v(null);
  ir(o, s);
  const c = (d) => {
    or(d) && l(d.key);
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
        "aria-activedescendant": t.findable ? void 0 : Pn(t, a),
        onKeyDown: cr(t, Oc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Fc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: Ne.empty, children: "No match" })
  ] });
}
function Wc(e, t) {
  const a = e.open ? Pn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function dr(...e) {
  return e.filter(Boolean).join(" ");
}
function Kc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Uc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const l = !e.options.some((d) => d.value === e.value), s = (c = qe()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: dr(Ne.trigger, e.triggerClassName),
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
      ...Hc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: Ne.value, "data-placeholder": l || void 0, children: Kc(e) })
    }
  );
}
function ur(e) {
  const t = qe(), a = t ? { ...e, disabled: !0, "aria-describedby": Zt(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, l = v(null), s = v(null), c = v(null), d = Bc(a, s), u = Pc(d.open, c);
  return rr(d.open, l, () => d.close(!1)), Wc(d, o), /* @__PURE__ */ i("div", { ref: l, className: dr(Ne.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Uc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(jc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const Gc = "_field_nytdz_2", Vc = "_label_nytdz_8", Yc = "_labelHidden_nytdz_15", Jc = "_control_nytdz_25", Qc = "_mono_nytdz_45", Xc = "_area_nytdz_50", Zc = "_invalid_nytdz_57", je = {
  field: Gc,
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
}, hr = (e) => `${e}-label`;
function td({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? ed : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function nd({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    ur,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": hr(t.id),
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
const od = { input: td, select: nd, textarea: ad, date: rd };
function ld(e, t, a) {
  const r = od[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function id(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Zt(dt(o ? a : void 0, e.describedBy), r),
    onChange: (l) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, l.target.value);
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
function I(e) {
  const t = y(), a = `${t}-msg`, r = id(e, t, a, qe()), o = sd(e);
  return /* @__PURE__ */ i("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: hr(t), className: cd(e.labelHidden), htmlFor: t, children: e.label }),
    ld(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const dd = "_root_1giy4_2", ud = "_trigger_1giy4_9", hd = "_ghost_1giy4_27", md = "_panel_1giy4_46", wd = "_edged_1giy4_67", _d = "_menu_1giy4_73", fd = "_group_1giy4_78", vd = "_heading_1giy4_83", bd = "_item_1giy4_89", pd = "_description_1giy4_105", gd = "_large_1giy4_109", yd = "_touch_1giy4_113", Nd = "_icon_1giy4_117", kd = "_label_1giy4_125", $d = "_text_1giy4_130", Cd = "_trailing_1giy4_138", Sd = "_check_1giy4_144", Rd = "_separator_1giy4_183", xd = "_footer_1giy4_189", Td = "_find_1giy4_196", Ld = "_findGlyph_1giy4_208", Md = "_findInput_1giy4_214", Ad = "_empty_1giy4_230", L = {
  root: dd,
  trigger: ud,
  ghost: hd,
  panel: md,
  edged: wd,
  menu: _d,
  group: fd,
  heading: vd,
  item: bd,
  description: pd,
  large: gd,
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
}, mr = $e(null);
function Ed(e, t) {
  const [a, r] = f({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((l) => ({ open: !0, start: o, request: l.request + 1 })),
    close: (o) => {
      var l;
      Ka(() => r((s) => ({ ...s, open: !1 }))), o && ((l = t.current) == null || l.focus());
    }
  };
}
const Id = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Bd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Id.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function qn(...e) {
  return e.filter(Boolean).join(" ");
}
function Pd(e, t = {}, a = "field") {
  const { ref: r, className: o, ...l } = t;
  return { ...l, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: qn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function wr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = v(null), o = v(null), l = Ed(e.defaultOpen === !0, o);
  return rr(l.open, r, () => l.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: qn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Pd(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": l.open,
        "aria-controls": l.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Bd(l),
        children: e.label
      }
    ),
    l.open && /* @__PURE__ */ n(mr.Provider, { value: { ...a, popup: l, button: o }, children: e.children })
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
  const r = (o) => o.label.toLowerCase().includes(a);
  return zd(e.map((o) => Fd(o, r)).filter((o) => o !== null));
}
const _r = (e, t) => (e % t + t) % t;
function Fe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = _r(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Wd = (e) => e.split("").every((t) => t === e[0]);
function Kd(e, t, a) {
  const r = Wd(a), o = r ? a[0] : a, l = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = _r(l + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ud(e) {
  const t = v([]);
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
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
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
  const r = lr(), o = Gd(e, t), l = (s) => {
    if (or(s)) {
      if (!a) return e.focus(Kd(e.items, e.current(), r(s.key)));
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
function Yd(e) {
  const t = v(!1);
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
  const { start: a, request: r } = t, o = v(e);
  o.current = e, S(() => {
    const { items: l, focus: s } = o.current;
    a && s(a === "first" ? Jd(l) : Fe(l, l.length, -1));
  }, [a, r]);
}
function Xd({ row: e, nav: t, popup: a }) {
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
function da(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    tu(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(nu, {}) : null
  ] });
}
function fr(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (l) => {
      e.nav.refs.current[a] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...eu(t, r),
    ...Xd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...o, children: da(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: da(t, r) });
}
function au({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((l) => /* @__PURE__ */ n(fr, { row: l, nav: a, popup: r }, l.at))
  ] });
}
function ru({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(au, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(fr, { row: e.row, nav: t, popup: a });
}
function ou() {
  const e = pe(mr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function lu() {
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
function su({ find: e, query: t, setQuery: a, input: r, nav: o, popup: l, menuId: s }) {
  const c = iu(o, l), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(lu, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function cu(e, t) {
  const [a, r] = f(""), o = v(null), l = t !== void 0 && Dd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return l ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: jd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const du = { regular: void 0, large: L.large, touch: L.touch }, uu = (e, t) => qn(L.panel, e ? L.edged : void 0, du[t]);
function hu({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function vr({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: l = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = ou(), h = v(null);
  ir(u, h, a, o);
  const m = cu(e, r), _ = qd(m.entries), N = Ud(_.flatMap(Od).map((P) => P.item)), k = Vd(N, s, m.toFind), M = Yd(s);
  return Qd(N, s), /* @__PURE__ */ i("div", { ref: h, className: uu(o, l), ...M, children: [
    m.find && /* @__PURE__ */ n(su, { find: m.find, query: m.query, setQuery: m.setQuery, input: m.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: _.map((P, we) => /* @__PURE__ */ n(ru, { block: P, nav: N, popup: s }, we)) }),
    /* @__PURE__ */ n(hu, { find: m.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function mu(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function br(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !mu(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const wu = (e, t) => e.reduce((a, r) => a + r + t, -t);
function _u({ room: e, widths: t, more: a, gap: r }, o) {
  const l = t.map((d, u) => u);
  if (wu(t, r) <= e) return l;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of l)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return l.filter((d) => s.has(d));
}
const sn = (e) => Number.parseFloat(e) || 0, ua = (e) => e.getBoundingClientRect().width;
function fu(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - sn(a.paddingInlineStart) - sn(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), ua),
    more: r ? ua(r) : 0,
    gap: sn(a.columnGap)
  };
}
function vu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const bu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function pr(e, t, a, r = ':scope > [role="tab"]') {
  const [o, l] = f(null);
  return Qe(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = fu(s, r);
      l((u) => bu(u, d) ? u : d);
    };
    return c(), vu(s, c);
  }, [e, a, r]), o && _u(o, t);
}
const pu = "_strip_1pizx_2", gu = "_fits_1pizx_19", yu = "_probe_1pizx_27", Nu = "_moreRoot_1pizx_36", ku = "_more_1pizx_36", $u = "_tab_1pizx_55", Cu = "_count_1pizx_91", Su = "_badge_1pizx_97", G = {
  strip: pu,
  fits: gu,
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
const ha = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, On = (e) => e.badge === void 0 ? ha(e) : `${ha(e)}, ${e.badge}`;
function yr(e) {
  return `${G.strip} ward-tabs ward-tabs--${e}`;
}
const xu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Tu({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${G.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : On(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: G.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: G.badge, children: e.badge })
      ]
    }
  );
}
function Lu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((l) => l.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Mu({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(wr, { label: gr, className: G.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: G.more }, children: /* @__PURE__ */ n(vr, { align: "end", entries: e.map((r) => ({ label: On(r), onSelect: () => a(r.id) })) }) });
}
function Au(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : xu;
}
function e3({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const l = Qt({ orientation: "horizontal" }), s = Ru(e, t);
  S(() => l.setActive(s), [l.setActive, s]);
  const c = v(null);
  br(c, o);
  const d = pr(c, s, e.map(On).join(`
`)), u = d ? e.filter((h, m) => !d.includes(m)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${yr(o)} ${G.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...l.containerProps, children: [
    e.map((h, m) => /* @__PURE__ */ n(Tu, { tab: h, active: t, place: Au(l, d, m), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${G.more} ${G.probe}`, children: gr }),
    u.length > 0 && /* @__PURE__ */ n(Mu, { tabs: u, trigger: l.itemProps(e.length), onPick: Lu(c, a) })
  ] });
}
const ma = 7, Nr = "More", Eu = ":scope > a", kr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Iu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Bu(e, t) {
  return !e || e.includes(t) ? {} : Iu;
}
function Pu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${G.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: G.count, children: `· ${e.count}` })
    ] })
  ] });
}
function qu({ links: e }) {
  return /* @__PURE__ */ n(wr, { label: Nr, className: G.moreRoot, trigger: { className: G.more }, children: /* @__PURE__ */ n(vr, { align: "end", entries: e.map((t) => ({ label: kr(t), href: t.href })) }) });
}
function t3({ links: e, active: t, label: a, level: r }) {
  if (e.length > ma) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ma} — the set is fixed`);
  const o = v(null);
  br(o, r);
  const l = Math.max(0, e.findIndex((d) => d.id === t)), s = pr(o, l, e.map(kr).join(`
`), Eu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: o, className: `${yr(r)} ${G.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Pu, { link: d, current: d.id === t, place: Bu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${G.more} ${G.probe}`, children: Nr }),
    c.length > 0 && /* @__PURE__ */ n(qu, { links: c })
  ] });
}
const Ou = "_root_jws4d_3", Du = "_segment_jws4d_9", wa = {
  root: Ou,
  segment: Du
};
function $r({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: l }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Qt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${wa.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: wa.segment,
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
const Hu = "_sidebar_s9o1j_3", Fu = "_brand_s9o1j_9", zu = "_mark_s9o1j_17", ju = "_word_s9o1j_24", Wu = "_nav_s9o1j_30", Ku = "_navItem_s9o1j_39", Uu = "_footLink_s9o1j_49", Gu = "_group_s9o1j_58", Vu = "_groupName_s9o1j_65", Yu = "_agents_s9o1j_81", Ju = "_agent_s9o1j_81", Qu = "_root_s9o1j_96", Xu = "_agentTop_s9o1j_105", Zu = "_dot_s9o1j_112", eh = "_agentName_s9o1j_124", th = "_agentMeta_s9o1j_138", nh = "_foot_s9o1j_49", ah = "_footName_s9o1j_150", rh = "_footLinks_s9o1j_157", oh = "_linkBrand_s9o1j_184", lh = "_label_s9o1j_205", ih = "_note_s9o1j_210", sh = "_footer_s9o1j_226", E = {
  sidebar: Hu,
  brand: Fu,
  mark: zu,
  word: ju,
  nav: Wu,
  navItem: Ku,
  new: "_new_s9o1j_48",
  footLink: Uu,
  group: Gu,
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
  linkBrand: oh,
  label: lh,
  note: ih,
  footer: sh
};
function ch({ agent: e }) {
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
              style: { "--dot": Mn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function dh({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function uh({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: l }) {
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
      o && /* @__PURE__ */ n("a", { className: E.new, href: T(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n(ch, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(dh, { shared: l })
  ] });
}
function hh(e) {
  return e.destinations ?? e.items ?? [];
}
function mh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function wh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function _h({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function fh(e) {
  return /* @__PURE__ */ i("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(mh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: hh(e).map((t) => /* @__PURE__ */ n(_h, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(wh, { children: e.children })
  ] });
}
function vh(e) {
  return "agents" in e;
}
function n3(e) {
  return vh(e) ? /* @__PURE__ */ n(uh, { ...e }) : /* @__PURE__ */ n(fh, { ...e });
}
const bh = "_mark_wlgi8_3", ph = {
  mark: bh
}, gh = { met: "✓", unmet: "", failed: "✕" };
function Dn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: ph.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: gh[e]
    }
  );
}
const yh = "_avatar_1t33a_3", Nh = {
  avatar: yh
};
function zt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function kh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [zt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function $h(e, t) {
  const a = kh(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(zt(e).charAt(0) + String(r)); ) r += 1;
  return zt(e).charAt(0) + String(r);
}
function a3(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = $h(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Ch(e) {
  return e != null && yt(e) ? Qo(e) : void 0;
}
function r3({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Nh.avatar, "data-size": a, "aria-hidden": "true", style: Ch(t), children: r ?? zt(e) });
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
function Eh(e) {
  return !Number.isNaN(Date.parse(e ?? ""));
}
function Ih(e, t, a) {
  return [t, a].find(Eh) ?? e;
}
function Hn({ connection: e, since: t, lastEventAt: a }) {
  const [r] = f(() => (/* @__PURE__ */ new Date()).toISOString()), o = Ih(r, t, a), l = An(o, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${xt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ke, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${xt.chip} ward-connection`, role: "status", children: [
    "Reconnecting ·",
    " ",
    /* @__PURE__ */ n("span", { className: xt.noCase, children: Ln(l) })
  ] }) : /* @__PURE__ */ i("span", { className: `${xt.chip} ward-connection`, role: "status", children: [
    "Out of date · as of ",
    me(o)
  ] });
}
const Bh = "_root_19rl8_2", Ph = "_context_19rl8_13", qh = "_row_19rl8_1", Oh = "_heading_19rl8_27", Dh = "_headingWrap_19rl8_35", Hh = "_meta_19rl8_41", Fh = "_chips_19rl8_49", zh = "_title_19rl8_56", jh = "_consequence_19rl8_66", Wh = "_actionsWrap_19rl8_73", Kh = "_actions_19rl8_73", Uh = "_action_19rl8_73", Gh = "_overflowPanel_19rl8_102", Vh = "_measureClip_19rl8_113", Yh = "_measure_19rl8_113", U = {
  root: Bh,
  context: Ph,
  row: qh,
  heading: Oh,
  headingWrap: Dh,
  meta: Hh,
  chips: Fh,
  title: zh,
  consequence: jh,
  actionsWrap: Wh,
  actions: Kh,
  action: Uh,
  overflowPanel: Gh,
  measureClip: Vh,
  measure: Yh
};
function Jh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(st, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Qh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(w, { ...t }, t.label)) }) : null;
}
function Xh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function Zh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Qh, { chips: e }),
    /* @__PURE__ */ n(Xh, { consequence: t, consequenceHint: a })
  ] });
}
function em({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: U.heading, children: [
    /* @__PURE__ */ n(Jh, { title: e, density: o }),
    /* @__PURE__ */ n(Zh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function gn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function _a({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function tm({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(_a, { disclosure: o }) : t ? [/* @__PURE__ */ n(_a, { disclosure: o }, "more"), /* @__PURE__ */ n(gn, { actions: e }, "actions")] : /* @__PURE__ */ n(gn, { actions: e });
}
function nm(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function am({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(gn, { actions: e }) });
}
function rm(e, t) {
  const a = y(), [r, o] = f(!1), l = r && e;
  return { disclosure: { open: l, panelId: a, toggle: () => o(!l) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const om = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function lm(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && om(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function im({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(_c, { path: e.path, current: e.current }) });
}
function sm(...e) {
  return e.some((t) => t === null);
}
function cm(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Cr(e) {
  return getComputedStyle(e).flexDirection === "column";
}
function dm(e, t) {
  return Cr(e) ? 0 : t.offsetWidth + cm(e);
}
function um(e, t) {
  return !Cr(e) && t.scrollWidth > t.clientWidth + 1;
}
function hm(e, t, a, r, o) {
  if (o === 0 || sm(t, a, r)) return !1;
  if (e.clientWidth === 0) return null;
  const [l, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - dm(e, l));
  return c.offsetWidth > d || um(e, s);
}
function mm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function wm(e) {
  return Mo(e) && (e.type === "a" || typeof e.props.href == "string");
}
function _m(e, t) {
  return t.length === 0 && e.length === 1 && wm(e[0]);
}
function fm(e, t) {
  const a = v(null), r = v(null), o = v(null), l = v(null), [s, c] = f(!1);
  return S(() => {
    const d = a.current;
    if (!mm(d)) return;
    const u = () => {
      const m = hm(d, r.current, o.current, l.current, e);
      m !== null && c(m);
    }, h = new ResizeObserver(u);
    return h.observe(d), l.current && h.observe(l.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: l, collapsed: s && !t };
}
function vm({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ i("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function bm({ connection: e }) {
  return e ? /* @__PURE__ */ n(Hn, { connection: e.connection, since: e.since }) : null;
}
function o3({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: l, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: m, headingRef: _, actionsRef: N, measureRef: k, collapsed: M } = fm(s.length, _m(s, c)), P = c.length > 0, { disclosure: we, close: ae } = rm(M || P, N), Ce = nm(c, s, M, u);
  return /* @__PURE__ */ i("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(im, { crumb: lm(e, r, t) }),
    /* @__PURE__ */ i("div", { className: U.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(em, { title: r, chips: a, consequence: o, consequenceHint: l, density: h }) }),
      /* @__PURE__ */ i("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(bm, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(tm, { actions: s, hasMore: P, collapsed: M, onOverflow: u, disclosure: we }) })
      ] })
    ] }),
    /* @__PURE__ */ n(am, { actions: Ce, disclosure: we, onEscape: ae }),
    /* @__PURE__ */ n(vm, { actions: s, hasMore: P, measureRef: k })
  ] });
}
const pm = "_root_td96x_2", gm = "_body_td96x_16", fa = {
  root: pm,
  body: gm
};
function l3({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${fa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: fa.body, children: a }) });
}
const ym = "_root_13a5b_2", Nm = "_label_13a5b_10", km = "_value_13a5b_14", $m = "_note_13a5b_21", Tt = {
  root: ym,
  label: Nm,
  value: km,
  note: $m
};
function i3({ label: e, value: t }) {
  const [a, r] = f(""), o = v(null), l = () => {
    var d, u;
    const c = document.createRange();
    o.current && c.selectNodeContents(o.current), (d = window.getSelection()) == null || d.removeAllRanges(), (u = window.getSelection()) == null || u.addRange(c), r("Select it to copy it.");
  }, s = () => {
    const c = navigator.clipboard;
    if (!c) return l();
    c.writeText(t).then(() => r("Copied."), l);
  };
  return /* @__PURE__ */ i("div", { className: `${Tt.root} ward-copyvalue`, role: "group", "aria-label": e, children: [
    /* @__PURE__ */ n("span", { className: Tt.label, children: e }),
    /* @__PURE__ */ n("code", { ref: o, className: Tt.value, children: t }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Copy", onClick: s }),
    /* @__PURE__ */ n("span", { role: "status", className: Tt.note, children: a })
  ] });
}
const Cm = "_tip_1bmx3_2", Sm = "_bubble_1bmx3_1", va = {
  tip: Cm,
  bubble: Sm
}, ht = 16;
function Rm(e, t, a) {
  return e < ht ? ht - e : t > a - ht ? Math.max(a - ht - t, ht - e) : 0;
}
function xm(e) {
  const t = v(null), [a, r] = f(0);
  return Qe(() => {
    const o = t.current;
    if (!e || o === null) {
      r(0);
      return;
    }
    const l = o.getBoundingClientRect();
    r((s) => s + Rm(l.left, l.right, window.innerWidth));
  }, [e]), { bubble: t, style: { "--ward-tip-shift": `${a}px` } };
}
function s3({ label: e, text: t, align: a = "center" }) {
  const r = y(), [o, l] = f(!1), s = xm(o), c = (h) => {
    h.key !== "Escape" || !o || (h.stopPropagation(), l(!1));
  }, d = () => l(!0), u = () => l(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      className: `${va.tip} ward-infotip`,
      "aria-label": `What ${e} counts`,
      "aria-describedby": r,
      "data-open": o ? "" : void 0,
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
        /* @__PURE__ */ n("span", { className: va.bubble, role: "tooltip", id: r, ref: s.bubble, style: s.style, children: t })
      ]
    }
  );
}
const Tm = "_row_zzkv3_3", Lm = {
  row: Tm
}, Fn = "custom", Mm = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: Fn, label: "Custom range" }
], Am = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, Em = (e) => e.from !== "" && e.to !== "" && e.from > e.to, ba = { from: "", to: "" }, Im = (e, t) => t === null && "preset" in e ? e.preset : Fn;
function Bm({ range: e, today: t, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(I, { kind: "date", label: "From", value: e.from, max: e.to || t, onChange: a("from"), invalid: Em(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ n(I, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: t, onChange: a("to") })
  ] });
}
function c3({ value: e, onChange: t, today: a }) {
  const [r, o] = f("from" in e ? e : null), l = (c) => {
    if (c === Fn) return o(r ?? ba);
    o(null), t({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? ba, [c]: d };
    o(u), Am(u) && t(u);
  };
  return /* @__PURE__ */ i("div", { className: `${Lm.row} ward-period`, children: [
    /* @__PURE__ */ n(I, { kind: "select", label: "Period", value: Im(e, r), options: Mm, onChange: l }),
    r === null ? null : /* @__PURE__ */ n(Bm, { range: r, today: a, setEnd: s })
  ] });
}
const Pm = "_root_bf1pc_2", qm = "_table_bf1pc_9", Om = "_caption_bf1pc_14", Dm = "_series_bf1pc_23", Hm = "_category_bf1pc_31", Fm = "_cell_bf1pc_39", zm = "_track_bf1pc_45", jm = "_lane_bf1pc_52", Wm = "_bar_bf1pc_56", Km = "_value_bf1pc_63", Um = "_swatch_bf1pc_70", Gm = "_empty_bf1pc_78", Q = {
  root: Pm,
  table: qm,
  caption: Om,
  series: Dm,
  category: Hm,
  cell: Fm,
  track: zm,
  lane: jm,
  bar: Wm,
  value: Km,
  swatch: Um,
  empty: Gm
}, Vm = "None", pa = 6;
function Ym(e, t) {
  if (t.length < 1 || t.length > pa)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${pa}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Jm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Sr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Qm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Xm({ value: e, top: t, step: a, format: r, missing: o }) {
  const l = Qm(e, t), s = { "--share": `${l}%` };
  return /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ i("span", { className: Q.track, children: [
    /* @__PURE__ */ n("span", { className: Q.lane, children: l > 0 ? /* @__PURE__ */ n("span", { className: `${Q.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Q.value, children: e === null ? o : r(e) })
  ] }) });
}
function Zm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Q.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Q.swatch, "data-step": Sr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function ew({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Q.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Q.empty, children: t })
  ] });
}
function tw({ title: e, categories: t, series: a, top: r, format: o = ne, categoryHead: l = "Category", missing: s = Vm }) {
  return /* @__PURE__ */ n("div", { className: `${Q.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Q.table, children: [
    /* @__PURE__ */ n("caption", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Q.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: l }) }),
      /* @__PURE__ */ n(Zm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Q.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Xm, { value: u.values[d], top: r, step: Sr(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function d3(e) {
  Ym(e.categories, e.series);
  const t = Jm(e.series);
  return t === 0 ? /* @__PURE__ */ n(ew, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(tw, { ...e, top: t });
}
const nw = "_root_1bfqw_2", aw = "_figure_1bfqw_7", rw = "_of_1bfqw_13", ow = "_bar_1bfqw_18", lw = "_rows_1bfqw_38", iw = "_row_1bfqw_38", sw = "_label_1bfqw_49", cw = "_amount_1bfqw_54", Oe = {
  root: nw,
  figure: aw,
  of: rw,
  bar: ow,
  rows: lw,
  row: iw,
  label: sw,
  amount: cw
};
function dw({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${Oe.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${Oe.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ i("span", { className: Oe.of, children: [
        "of ",
        oe(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Oe.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Oe.rows, children: a.map((o) => /* @__PURE__ */ i("li", { className: `${Oe.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Oe.amount, children: oe(o.amount) })
    ] }, o.label)) })
  ] });
}
const uw = "_frame_f7bxz_2", hw = "_table_f7bxz_6", mw = "_th_f7bxz_12", ww = "_td_f7bxz_13", _w = "_sort_f7bxz_53", fw = "_row_f7bxz_65", vw = "_empty_f7bxz_73", ze = {
  frame: uw,
  table: hw,
  th: mw,
  td: ww,
  sort: _w,
  row: fw,
  empty: vw
}, bw = { asc: "ascending", desc: "descending" };
function pw(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return bw[t.direction];
}
function gw(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: ze.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function yw(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Nw({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ze.th,
      style: yw(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": pw(e, t),
      children: gw(e, a)
    }
  );
}
function kw({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: ze.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: ze.td,
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
function $w({
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
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: ze.empty, children: u }) : /* @__PURE__ */ n("div", { className: ze.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: ze.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ze.head, children: t.map((m) => /* @__PURE__ */ n(Nw, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((m) => /* @__PURE__ */ n(kw, { row: m, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: l, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(m))) })
  ] }) });
}
const Cw = "_list_v0s52_2", Sw = {
  list: Cw
};
function Rw({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Sw.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const xw = "_label_1u62a_2", Tw = {
  label: xw
};
function u3({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Tw.label, children: t.header }) }, t.key)) }) });
}
const Lw = "_stack_bp6a0_2", Mw = {
  stack: Lw
};
function h3({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Mw.stack, "data-ward-action-stack": "", children: e });
}
const Aw = "_set_1z0sq_2", Ew = "_legend_1z0sq_7", Iw = "_row_1z0sq_15", Bw = "_control_1z0sq_20", Pw = "_input_1z0sq_26", qw = "_label_1z0sq_31", Ow = "_consequence_1z0sq_36", Ge = {
  set: Aw,
  legend: Ew,
  row: Iw,
  control: Bw,
  input: Pw,
  label: qw,
  consequence: Ow
};
function Rr({ legend: e, options: t, value: a, onChange: r, disabled: o, name: l, describedBy: s, variant: c }) {
  const d = y(), u = l ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ge.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ge.legend, children: e }),
    t.map((h) => {
      const m = `${u}-${h.value}`, _ = h.consequence ? `${m}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ge.row, children: [
        /* @__PURE__ */ i("span", { className: Ge.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: m,
              type: "radio",
              name: u,
              className: Ge.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": dt(_, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: m, className: Ge.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ge.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Dw = "_root_11gpw_2", Hw = "_head_11gpw_10", Fw = "_note_11gpw_29", zw = "_index_11gpw_34", jw = "_dot_11gpw_38", Ww = "_counter_11gpw_49", Kw = "_trailing_11gpw_57", Ye = {
  root: Dw,
  head: Hw,
  note: Fw,
  index: zw,
  dot: jw,
  counter: Ww,
  trailing: Kw
};
function Uw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ye.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ye.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Gw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ye.counter, "aria-hidden": "true", children: e }) : null;
}
function ga({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: l }) {
  return /* @__PURE__ */ i("div", { className: `${Ye.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ i("h2", { className: Ye.head, children: [
      /* @__PURE__ */ n(Uw, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ye.note, children: a }),
    /* @__PURE__ */ n(Gw, { counter: r }),
    l === void 0 ? null : /* @__PURE__ */ n("span", { className: Ye.trailing, children: l })
  ] });
}
const Vw = "_strip_c3x3u_2", Yw = "_cell_c3x3u_7", Jw = "_value_c3x3u_12", Qw = "_link_c3x3u_29", Xw = "_label_c3x3u_49", Zw = "_tiles_c3x3u_101", We = {
  strip: Vw,
  cell: Yw,
  value: Jw,
  link: Qw,
  label: Xw,
  tiles: Zw
};
function xr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Tr = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function e_({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Tr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function t_({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Tr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${We.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Lr = (e) => e.href === void 0 ? /* @__PURE__ */ n(e_, { cell: e }, e.label) : /* @__PURE__ */ n(t_, { cell: e, href: e.href }, e.label);
function tn({ cells: e, divided: t = !1 }) {
  return xr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Lr) });
}
const ya = 6;
function m3({ cells: e }) {
  xr("StatTiles", e, [1, 2 * ya]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, ya) };
  return /* @__PURE__ */ n("dl", { className: `${We.tiles} ward-stattiles`, style: t, children: e.map(Lr) });
}
const n_ = "_root_1eb1u_2", a_ = "_track_1eb1u_8", r_ = "_thumb_1eb1u_46", o_ = "_labelHidden_1eb1u_64", l_ = "_label_1eb1u_64", it = {
  root: n_,
  track: a_,
  thumb: r_,
  labelHidden: o_,
  label: l_
};
function i_(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function s_(e) {
  return e ? `${it.label} ${it.labelHidden}` : it.label;
}
function c_(e, t, a) {
  return e && !t && a ? a : void 0;
}
function d_(e, t, a, r) {
  return { "aria-describedby": Zt(dt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function u_({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Xe({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: l, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, m = qe(), { on: _, off: N } = i_(t, r, o, m !== null), k = c_(N, m !== null, c);
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
        ...d_(h, l, m, k),
        className: `${it.track} ward-switch`,
        "data-on": _,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: it.thumb })
      }
    ),
    /* @__PURE__ */ n("label", { id: d, htmlFor: u, className: s_(s), children: e }),
    /* @__PURE__ */ n(u_, { id: h, reason: k })
  ] });
}
const h_ = "_bar_1vp69_2", m_ = "_skip_1vp69_11", w_ = "_mark_1vp69_22", __ = "_nav_1vp69_30", f_ = "_list_1vp69_34", v_ = "_select_1vp69_41", b_ = "_selectTrigger_1vp69_45", p_ = "_dest_1vp69_52", g_ = "_actor_1vp69_71", y_ = "_actorMark_1vp69_84", N_ = "_actorLabel_1vp69_89", k_ = "_tagline_1vp69_108", ce = {
  bar: h_,
  skip: m_,
  mark: w_,
  nav: __,
  list: f_,
  select: v_,
  selectTrigger: b_,
  dest: p_,
  actor: g_,
  actorMark: y_,
  actorLabel: N_,
  tagline: k_
};
function $_(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function C_(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function w3({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: l, skipTo: s = "main" }) {
  const c = C_(r);
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
        ur,
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
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: $_(c) })
    ] })
  ] });
}
const S_ = "_tree_zzoob_2", R_ = "_item_zzoob_6", x_ = "_row_zzoob_10", T_ = "_button_zzoob_22", jt = {
  tree: S_,
  item: R_,
  row: x_,
  button: T_
}, Mr = $e(null);
function L_({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Qt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Mr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: jt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const M_ = { ArrowRight: !0, ArrowLeft: !1 };
function Na(e) {
  return e ? !0 : void 0;
}
function A_(e, t) {
  const a = M_[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function E_(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function I_(e) {
  const t = [jt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function B_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function P_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function q_(e) {
  return typeof e == "string" ? e : void 0;
}
function O_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function D_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ar(e) {
  const t = pe(Mr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = B_(e);
  return /* @__PURE__ */ i("li", { className: jt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: I_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": Na(e.unresolved),
        "data-inherited": Na(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${jt.button} ward-treeitem-btn`,
            onClick: () => E_(e),
            onKeyDown: (r) => A_(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: P_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: q_(e.label), children: e.label }),
              /* @__PURE__ */ n(O_, { value: e.detail }),
              /* @__PURE__ */ n(D_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const H_ = "_frame_gxspk_2", F_ = "_subjectRail_gxspk_22", z_ = "_subject_gxspk_22", j_ = "_rail_gxspk_42", W_ = "_record_gxspk_57", K_ = "_recordBody_gxspk_102", U_ = "_stageGrid_gxspk_157", G_ = "_band_gxspk_171", V_ = "_bandBody_gxspk_179", Y_ = "_bandActions_gxspk_184", J_ = "_scroller_gxspk_192", Q_ = "_board_gxspk_219", X_ = "_lanes_gxspk_228", Z_ = "_cardGrid_gxspk_262", X = {
  frame: H_,
  subjectRail: F_,
  subject: z_,
  rail: j_,
  record: W_,
  recordBody: K_,
  stageGrid: U_,
  band: G_,
  bandBody: V_,
  bandActions: Y_,
  scroller: J_,
  board: Q_,
  lanes: X_,
  cardGrid: Z_
};
function _3({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: X.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ka(e) {
  return e ? "true" : void 0;
}
function f3({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: l }) {
  return /* @__PURE__ */ i("div", { className: X.subjectRail, "data-ward-subject-rail": a, "data-ruled": ka(l), children: [
    /* @__PURE__ */ n("div", { className: X.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: X.rail, "data-sticky": ka(o), "aria-label": r, children: t })
  ] });
}
function v3({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: l, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: X.record, "aria-label": l, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ga, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: X.record, "aria-label": l, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ga, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: X.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const ef = "_form_1j8ub_2", tf = "_fields_1j8ub_9", nf = "_actions_1j8ub_19", cn = {
  form: ef,
  fields: tf,
  actions: nf
};
function b3({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (l) => {
    l.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: cn.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: cn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: cn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function p3({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: X.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: X.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: X.bandActions, children: t })
  ] });
}
const af = "(max-width: 767.98px)";
function zn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(In, { className: X.scroller, label: e, count: a ?? Wa.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function rf({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = f(null), l = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(I, { kind: "select", label: a, value: (l == null ? void 0 : l.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(zn, { label: t, children: l == null ? void 0 : l.content })
  ] });
}
function of({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ n(zn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ja, { children: a.content }, a.id)) }) });
}
function g3({ children: e, label: t = "Board", lanes: a, laneLabel: r = "Column" }) {
  const o = pt(af);
  return a === void 0 ? /* @__PURE__ */ n(zn, { label: t, children: e }) : o ? /* @__PURE__ */ n(rf, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(of, { lanes: a, label: t });
}
function y3({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), l = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(In, { className: X.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: l, children: t });
}
function N3({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${X.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const lf = "_block_6tv5x_3", sf = "_sentence_6tv5x_10", cf = "_meta_6tv5x_19", df = "_ways_6tv5x_24", uf = "_action_6tv5x_38", hf = "_strip_6tv5x_42", mf = "_loading_6tv5x_61", wf = "_label_6tv5x_69", _f = "_counter_6tv5x_76", be = {
  block: lf,
  sentence: sf,
  meta: cf,
  ways: df,
  action: uf,
  strip: hf,
  loading: mf,
  label: wf,
  counter: _f
};
function ff({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: be.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function nn({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: l, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${be.block} ward-state${l === void 0 ? "" : ` ${l}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ i("p", { className: be.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(ff, { action: t })
  ] });
}
function vf(e) {
  return /* @__PURE__ */ n(nn, { ...e, kind: "ward-emptystate" });
}
function k3({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(nn, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function bf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${be.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function $3({ ways: e, ...t }) {
  return /* @__PURE__ */ n(nn, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(bf, { ways: e }) });
}
function C3({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(nn, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "failed at ",
    me(t)
  ] }) });
}
function S3({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(t)
  ] });
}
function R3({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(t)
  ] });
}
function x3({ label: e, startedAt: t }) {
  const a = v(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = f(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), ye.load);
    return () => window.clearTimeout(s);
  }, []);
  const l = An(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: be.counter, children: Ln(l) }) : null
  ] });
}
const pf = "_note_cigdt_2", gf = {
  note: pf
};
function yf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: gf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const Nf = "_card_k7btg_3", kf = "_hit_k7btg_31", $f = "_head_k7btg_44", Cf = "_title_k7btg_51", Sf = "_meta_k7btg_57", Rf = "_since_k7btg_66", xf = "_sep_k7btg_76", Tf = "_fields_k7btg_80", Lf = "_field_k7btg_80", Mf = "_last_k7btg_98", Af = "_reason_k7btg_110", he = {
  card: Nf,
  hit: kf,
  head: $f,
  title: Cf,
  meta: Sf,
  since: Rf,
  sep: xf,
  fields: Tf,
  field: Lf,
  last: Mf,
  reason: Af
}, Ef = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function If(e, t, a) {
  const r = Pt(e, "blue"), o = Pt(e, "orange"), l = Pt(e, "green"), s = v(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: l };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Ef[d.type];
      u && c[u]();
    });
  }, [r, a, l, t, o]);
}
const Bf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Pf(e, t) {
  return Bf[t](e);
}
function qf({ item: e, connection: t }) {
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
function Of({ item: e }) {
  const t = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ n(w, { role: "drift", label: "Off plan" }),
    t && /* @__PURE__ */ n(w, { role: t.role, label: t.label })
  ] });
}
function Df({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Hf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: he.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: he.field, children: Pf(e, a) }, a)) });
}
const yn = (e) => e ? !0 : void 0;
function Ff(e) {
  return { "--stream": ke(e.streamStep, "id") };
}
function zf(e, t, a) {
  e == null || e(t, a);
}
function jf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Wf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: he.last, "data-stale": yn(t), children: a }) : null;
}
function an(e) {
  const t = e.fields ?? [], a = e.item, r = v(null);
  If(r, a.key, e.feed);
  const o = jf(e.feed), l = Ff(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: he.card,
      style: l,
      "data-selected": yn(e.selected),
      "data-flagged": yn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: he.hit, onClick: (s) => zf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Of, { item: a }),
        /* @__PURE__ */ n(st, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ n(qf, { item: a, connection: o }),
        /* @__PURE__ */ n(Df, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Hf, { item: a, fields: t }),
        /* @__PURE__ */ n(Wf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
function kt(e, t) {
  return e.trim().toLowerCase() === t.toLowerCase();
}
const Kf = "_column_1j8bi_3", Uf = "_head_1j8bi_21", Gf = "_label_1j8bi_30", Vf = "_count_1j8bi_39", Yf = "_list_1j8bi_53", vt = {
  column: Kf,
  head: Uf,
  label: Gf,
  count: Vf,
  list: Yf
};
function Er(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Jf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: vt.head, children: [
    /* @__PURE__ */ n("h2", { className: vt.label, id: a, title: e.label, children: e.label }),
    e.gate && !kt(e.label, "Review") && /* @__PURE__ */ n(w, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: vt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Qf(e) {
  return /* @__PURE__ */ n("div", { className: vt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      an,
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
function Xf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, m = Er(t, r);
  return /* @__PURE__ */ i("section", { className: vt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Jf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Qf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, rows: m }),
    h && /* @__PURE__ */ n(yf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Zf = "_foot_cs4jr_2", ev = "_note_cs4jr_13", tv = "_link_cs4jr_19", dn = {
  foot: Zf,
  note: ev,
  link: tv
};
function T3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: dn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: dn.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${dn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const nv = "_head_1tfi5_3", av = "_identity_1tfi5_12", rv = "_titleRow_1tfi5_18", ov = "_title_1tfi5_18", lv = "_key_1tfi5_35", iv = "_rollup_1tfi5_45", sv = "_tools_1tfi5_53", cv = "_swatch_1tfi5_101", dv = "_mark_1tfi5_108", Te = {
  head: nv,
  identity: av,
  titleRow: rv,
  title: ov,
  key: lv,
  rollup: iv,
  tools: sv,
  swatch: cv,
  mark: dv
}, $a = "initials:";
function uv(e) {
  return e === void 0 ? "done this week unknown" : `${ne(e)} done this week`;
}
function hv(e) {
  const t = [uv(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ne(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${se(e.p90)}`), t.join(" · ");
}
function mv(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ne(e.inFlight),
      " open"
    ] }),
    " · ",
    hv(e)
  ] });
}
function wv(e) {
  return e.startsWith($a) ? e.slice($a.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function _v({ markRef: e, streamStep: t }) {
  const a = { "--stream": ke(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Te.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: wv(e) }) : /* @__PURE__ */ n("span", { className: Te.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function fv({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function L3({
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
  return /* @__PURE__ */ i("div", { className: Te.head, children: [
    /* @__PURE__ */ i("div", { className: Te.identity, children: [
      /* @__PURE__ */ i("div", { className: Te.titleRow, children: [
        /* @__PURE__ */ n(_v, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Te.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Te.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Te.rollup, "aria-live": "polite", children: mv(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Te.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(fv, { owners: o, owner: l, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Hn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const vv = "_head_1sejb_14", bv = "_line_1sejb_15", pv = "_cHandle_1sejb_36", gv = "_cName_1sejb_41", yv = "_nameLine_1sejb_49", Nv = "_cLabel_1sejb_56", kv = "_cCap_1sejb_61", $v = "_cShown_1sejb_66", Cv = "_name_1sejb_49", Sv = "_noCap_1sejb_88", Rv = "_state_1sejb_102", xv = "_handle_1sejb_111", H = {
  head: vv,
  line: bv,
  cHandle: pv,
  cName: gv,
  nameLine: yv,
  cLabel: Nv,
  cCap: kv,
  cShown: $v,
  name: Cv,
  noCap: Sv,
  state: Rv,
  handle: xv
}, Tv = "Review stages always show", Lv = "Done stages are counted, not shown";
function M3() {
  return /* @__PURE__ */ i("div", { className: H.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.cHandle }),
    /* @__PURE__ */ n("span", { className: H.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: H.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: H.cShown, children: "Shown" })
  ] });
}
function Mv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Av(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function Ev({ stage: e }) {
  return /* @__PURE__ */ n("span", { className: H.cName, children: /* @__PURE__ */ i("span", { className: H.nameLine, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    e.gate && !kt(e.name, "Review") && /* @__PURE__ */ n(w, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function Iv(e) {
  return e === void 0 ? "" : String(e);
}
function Bv(e) {
  return e === "" ? void 0 : Number(e);
}
function Pv({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && Av(r, t),
      children: "⠿"
    }
  ) });
}
function qv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${H.cCap} ${H.noCap}`, "aria-hidden": "true" }) : /* @__PURE__ */ n("span", { className: H.cCap, children: /* @__PURE__ */ n(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Iv(t.cap), onChange: (r) => a({ ...t, cap: Bv(r) }) }) });
}
function Ov(e) {
  return e.gate ? Tv : e.terminal ? Lv : void 0;
}
function Dv({ stage: e, config: t, onChange: a }) {
  const r = qe() !== null, o = Mv(e, t.shown), l = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: H.cShown, children: [
    /* @__PURE__ */ n(Xe, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: Ov(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: H.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && s(!o.shown), children: o.state })
  ] });
}
function Hv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function A3({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: H.line, "data-kind": Hv(e), children: [
    /* @__PURE__ */ n(Pv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Ev, { stage: e }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: /* @__PURE__ */ n(I, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(qv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Dv, { stage: e, config: t, onChange: a })
  ] });
}
const Fv = "_body_8qsv9_2", zv = "_head_8qsv9_9", jv = "_summary_8qsv9_19", Wv = "_block_8qsv9_20", Kv = "_actionsBlock_8qsv9_21", Uv = "_title_8qsv9_41", Gv = "_note_8qsv9_46", Vv = "_k_8qsv9_51", Yv = "_kv_8qsv9_58", Jv = "_row_8qsv9_64", Qv = "_label_8qsv9_75", Xv = "_value_8qsv9_84", Zv = "_quote_8qsv9_90", eb = "_actions_8qsv9_21", tb = "_resolve_8qsv9_111", j = {
  body: Fv,
  head: zv,
  summary: jv,
  block: Wv,
  actionsBlock: Kv,
  title: Uv,
  note: Gv,
  k: Vv,
  kv: Yv,
  row: Jv,
  label: Qv,
  value: Xv,
  quote: Zv,
  actions: eb,
  resolve: tb
};
function nb(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function ab(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function rb(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function ob(e, t, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...nb(e),
    ...rb(a),
    ...ab(e, t)
  ];
}
function lb({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: j.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: j.k, children: t }),
    e
  ] });
}
function ib(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function sb({ item: e, showKey: t }) {
  const a = ib(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: j.head, children: [
    t && /* @__PURE__ */ n(w, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(w, { role: a.role, label: a.label })
  ] });
}
function cb({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: j.block, children: [
    /* @__PURE__ */ n("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function E3({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: l, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), m = ob(e, o, d);
  return /* @__PURE__ */ n(ut, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: j.body, children: [
    /* @__PURE__ */ n(sb, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: j.summary, children: [
      /* @__PURE__ */ n("h2", { className: j.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: j.kv, children: m.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: j.row, children: [
      /* @__PURE__ */ n("dt", { className: j.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: j.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(cb, { item: e }),
    /* @__PURE__ */ i("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: j.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ n(lb, { resolve: l, label: s ?? "Next steps" })
  ] }) });
}
const db = "_root_3azmy_2", ub = "_list_3azmy_7", hb = "_item_3azmy_12", mb = "_box_3azmy_18", wb = "_text_3azmy_23", _b = "_note_3azmy_28", et = {
  root: db,
  list: ub,
  item: hb,
  box: mb,
  text: wb,
  note: _b
};
function rn({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: et.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${et.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: et.box, children: /* @__PURE__ */ n(Dn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: et.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${et.note} ward-checklist-note`, children: t })
  ] });
}
const fb = "_rail_znbbp_2", vb = "_k_znbbp_11", bb = "_head_znbbp_19", pb = "_section_znbbp_25", gb = "_card_znbbp_39", yb = "_strip_znbbp_46", Nb = "_skeleton_znbbp_60", kb = "_skeletonLabel_znbbp_74", $b = "_bar_znbbp_80", Cb = "_note_znbbp_89", de = {
  rail: fb,
  k: vb,
  head: bb,
  section: pb,
  card: gb,
  strip: yb,
  skeleton: Nb,
  skeletonLabel: kb,
  bar: $b,
  note: Cb
};
function Sb(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ir({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    t
  ] });
}
function Rb({ effects: e }) {
  const t = e.filter((a) => !a.met);
  return t.length === 0 ? null : /* @__PURE__ */ n(Ir, { title: "Warnings", children: /* @__PURE__ */ n(rn, { items: t, density: "compact" }) });
}
function xb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function Tb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Xf, { column: o, items: t.filter((l) => l.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Lb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Tb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(xb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function I3(e) {
  const t = Sb(e.onOpen), a = Er(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ n("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: a && /* @__PURE__ */ n(an, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Ir, { title: "Columns", children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Lb, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Rb, { effects: e.effects })
  ] });
}
function Mb(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Ab(e) {
  return Math.ceil(e.length / 2);
}
function Eb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Br(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Ib(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Br(e);
  o !== void 0 && a(o), r(Eb(e.type));
}
function Bb(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (l) => Ib(l, a, r, o));
  }, [e, t, a, r, o]);
}
function Pb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function qb(e, t) {
  return t ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Ob(e, t) {
  return t !== void 0 ? se(e.timeInStage) + " · waits on " + t.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Db(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + q.height.card + " + " + q.height.cardRow + " * " + String(Ab(t ?? [])) + ")"
  };
}
function Hb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Fb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(w, { role: "meta", label: oe(e.cost) }) : null;
}
function zb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(w, { role: "meta", label: e.jiraKey }) : null;
}
function jb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Wb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Kb(e, t) {
  return t === void 0 ? e : Mb(e, t.ref);
}
function Ub(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function gt(e) {
  return e === !0 ? "true" : void 0;
}
function Pr(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = v(null), l = Pt(o), s = v(/* @__PURE__ */ new Set()), [c, d] = f(Pb(t));
  Bb(e.feed, t.key, s, d, l);
  const u = qb(t, r), h = Ob(t, a), m = Db(t, e.fields), _ = Wb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Ub(e),
      className: "ward-workcard",
      "data-flagged": gt(t.flagged),
      "data-selected": gt(e.selected),
      style: m,
      ref: Kb(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Hb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(w, { role: u.role, label: u.label }),
          Fb(t, e.fields),
          zb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          jb(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function Gb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Vb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Yb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(w, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ n(w, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Jb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Gb, { count: e.items.length, cap: e.column.cap });
}
function Qb(e, t) {
  return e.roving ?? t;
}
function Xb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Zb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Pr,
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
function ep(e) {
  const t = y(), a = Qt({ orientation: "vertical" }), r = Qb(e, a), o = Vb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": gt(o), "data-gate": gt(e.column.gate), children: [
    Yb(e.column, e.items.length, t),
    Jb(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Xb(e, a), children: Zb(e, r) })
  ] });
}
function tp(e) {
  let t = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (t += " · p50 " + se(e.p50)), e.p90 !== void 0 && (t += " · p90 " + se(e.p90)), t;
}
function np(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function ap(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function B3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(w, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(w, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: tp(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      np(e),
      ap(e.onConfigure),
      /* @__PURE__ */ n(Hn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function rp(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function op(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function lp(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(w, { role: "running", label: String(t) + (t === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(w, { role: "soft", label: "Done" }) : null
  ] });
}
function P3(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": gt(rp(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: op(e) }),
    /* @__PURE__ */ n(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(ar, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    lp(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function q3(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Pr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(ep, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function ip(e, t) {
  const a = Br(e);
  a !== void 0 && t(a);
}
function sp(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => ip(r, a));
  }, [e, t, a]);
}
function cp(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function dp(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function up(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function hp(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(w, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function O3(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = f((s = t.run) == null ? void 0 : s.lastStep);
  sp(e.feed, t.key, o);
  const l = [...cp(t), ...dp(t)];
  return /* @__PURE__ */ i(ut, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      l.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      up(a, r)
    ] }),
    hp(t, e.actions)
  ] });
}
const mp = "_card_1nkkx_3", wp = "_head_1nkkx_30", _p = "_mark_1nkkx_38", fp = "_name_1nkkx_50", vp = "_chips_1nkkx_71", bp = "_description_1nkkx_77", pp = "_run_1nkkx_82", gp = "_sep_1nkkx_91", yp = "_facts_1nkkx_97", Np = "_fact_1nkkx_97", kp = "_factLabel_1nkkx_111", $p = "_factValue_1nkkx_115", ie = {
  card: mp,
  head: wp,
  mark: _p,
  name: fp,
  chips: vp,
  description: bp,
  run: pp,
  sep: gp,
  facts: yp,
  fact: Np,
  factLabel: kp,
  factValue: $p
}, Cp = { live: "done", draft: "running", paused: "meta" };
function Sp(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Rp({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(w, { role: Cp[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function xp({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Tp({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Lp({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Mp(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Ap({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: l, className: s }) {
  const c = { "--stream": ke(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: Sp(s),
      style: c,
      "data-selected": d,
      "data-paused": Mp(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          e.streamStep === null ? null : /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(xp, { description: e.description }),
        /* @__PURE__ */ n(Tp, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Rp, { versions: e.versions }),
        /* @__PURE__ */ n(Lp, { facts: l })
      ]
    }
  );
}
const Ep = "_list_4dcyc_2", Ip = "_row_4dcyc_11", Bp = "_head_4dcyc_23", Pp = "_id_4dcyc_30", qp = "_lock_4dcyc_35", Op = "_reason_4dcyc_41", Dp = "_remove_4dcyc_46", Hp = "_clauses_4dcyc_50", Fp = "_clause_4dcyc_50", zp = "_label_4dcyc_64", jp = "_cell_4dcyc_71", Wp = "_value_4dcyc_76", ue = {
  list: Ep,
  row: Ip,
  head: Bp,
  id: Pp,
  lock: qp,
  reason: Op,
  remove: Dp,
  clauses: Hp,
  clause: Fp,
  label: zp,
  cell: jp,
  value: Wp
}, qr = $e(!1);
function D3({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(qr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ue.list, "aria-label": t, children: e }) });
}
function Kp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(I, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Up({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ n(w, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ue.reason, children: e })
  ] });
}
function Gp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ n("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Up, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Ca(e, t) {
  return e.locked ? void 0 : t;
}
function H3({ rule: e, onChange: t, onRemove: a }) {
  if (!pe(qr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Ca(e, t);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Gp, { rule: e, onRemove: Ca(e, a) }),
    /* @__PURE__ */ n("dl", { className: ue.clauses, children: e.clauses.map((o) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ n("dt", { className: ue.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ue.cell, children: /* @__PURE__ */ n(Kp, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Vp = "_ladder_1xdeh_2", Yp = "_cell_1xdeh_7", Jp = "_empty_1xdeh_26", Qp = "_name_1xdeh_34", Xp = "_holder_1xdeh_40", Zp = "_swatches_1xdeh_51", eg = "_swatch_1xdeh_51", tg = "_tilesFrame_1xdeh_78", ng = "_tiles_1xdeh_78", ag = "_tile_1xdeh_78", rg = "_bar_1xdeh_117", og = "_hex_1xdeh_128", lg = "_note_1xdeh_138", le = {
  ladder: Vp,
  cell: Yp,
  empty: Jp,
  name: Qp,
  holder: Xp,
  swatches: Zp,
  swatch: eg,
  tilesFrame: tg,
  tiles: ng,
  tile: ag,
  bar: rg,
  hex: og,
  note: lg
}, F3 = "Not available yet";
function ig(e) {
  return e.reserved ? "reserved" : yt(e.step) ? "validated" : "partial";
}
function Or(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function sg(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function cg({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${le.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function dg(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function ug(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Sa = (e) => String(e).padStart(2, "0");
function hg(e, t, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : t ?? Or(e, void 0);
}
function mg({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${le.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${le.hex} ward-ladder-hex`, children: r ? `step ${Sa(e)}` : Zo(e) }),
    /* @__PURE__ */ n("span", { className: `${le.note} ward-ladder-note`, children: r ? a : `Step ${Sa(e)} · ${a}` })
  ] });
}
function wg({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: l }) {
  const s = ig(e), c = Or(s, a), d = c !== "free", u = d || l, h = t === e.step, m = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${m} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...ug(d, h, u), "data-validation": s, style: sg(e, s), onClick: _, onKeyDown: (M) => dg(M, _) }, label: N, name: m, holder: c, validation: s, note: hg(s, a, h), step: e.step };
}
const _g = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${le.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${le.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(mg, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${le.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(cg, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${le.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${le.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function fg(e) {
  return _g[e.presentation](wg(e));
}
function vg(e) {
  for (const t of e)
    if (!t.reserved && !Xt(t.step)) throw new Error("colour ladder renders token steps only");
}
function bg(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const pg = { list: le.ladder, swatches: le.swatches, tiles: le.tilesFrame };
function gg(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Dr(e) {
  const t = e.takenBy ?? {}, a = (l) => {
    var s;
    (s = e.onChange) == null || s.call(e, l);
  };
  vg(e.steps);
  const r = bg(e), o = e.steps.map((l) => /* @__PURE__ */ n(fg, { step: l, value: e.value, taken: t[l.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, l.step));
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...gg(e.disabled === !0), className: `${pg[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: le.tiles, children: o }) : o });
}
const yg = "_rail_s06lm_2", Ng = "_section_s06lm_12", kg = "_sectionFlush_s06lm_22", $g = "_head_s06lm_26", Cg = "_headLabel_s06lm_34", Sg = "_sample_s06lm_42", Rg = "_sampleLabel_s06lm_47", xg = "_sampleTitle_s06lm_54", Tg = "_sampleMeta_s06lm_59", Lg = "_trace_s06lm_65", Mg = "_traceHead_s06lm_70", Ag = "_steps_s06lm_78", Eg = "_step_s06lm_78", Ig = "_stepTitle_s06lm_97", Bg = "_hollow_s06lm_107", Pg = "_stepBody_s06lm_115", qg = "_stepDetail_s06lm_127", Og = "_publish_s06lm_132", Dg = "_reason_s06lm_138", Hg = "_note_s06lm_143", Fg = "_reveal_s06lm_148", C = {
  rail: yg,
  section: Ng,
  sectionFlush: kg,
  head: $g,
  headLabel: Cg,
  sample: Sg,
  sampleLabel: Rg,
  sampleTitle: xg,
  sampleMeta: Tg,
  trace: Lg,
  traceHead: Mg,
  steps: Ag,
  step: Eg,
  stepTitle: Ig,
  hollow: Bg,
  stepBody: Pg,
  stepDetail: qg,
  publish: Og,
  reason: Dg,
  note: Hg,
  reveal: Fg
}, Ra = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, zg = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, jg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Wg = { notSimulated: "not simulated", running: "running" };
function Kg(e) {
  return e.presentation === "foundry";
}
function Ug(e, t) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = t.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function Gg(e, t) {
  var r;
  const a = zg[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Vg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Yg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Jg(e) {
  if (Vg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Qg(e) {
  const [t, a] = f(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${C.step} ${C.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Xg(e) {
  const t = Wg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: C.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Ke, { size: 6, kind: jg[e.kind], label: e.kind });
}
function Zg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: C.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function ey(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ty(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Qg, { kind: t.kind, children: [
    /* @__PURE__ */ n(Xg, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: C.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: C.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Zg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(ey, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function ny(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(se(t)), a.join(" · ");
}
function Hr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${C.trace} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.traceHead, id: t, children: ny(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: C.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(ty, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function ay(e) {
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
function ry(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${C.sampleMeta} ${C.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + t + ". Nothing saved." });
}
function oy(e) {
  const t = [{ value: e.run.cost === void 0 ? "Unknown" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ua(e.run.turns[0], e.run.turns[1]) : "Unknown", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(tn, { divided: !0, cells: t }) });
}
function ly(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Ua(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function iy(e) {
  const t = ly(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: C.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(tn, { divided: !0, cells: t }) });
}
function Fr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${C.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function sy(e) {
  return /* @__PURE__ */ i("div", { className: `${C.publish} ${C.section}`, children: [
    /* @__PURE__ */ n(Fr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: C.note, children: e.note })
  ] });
}
function cy(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${C.publish} ${C.section}`, children: /* @__PURE__ */ n(Fr, { reason: e.reason, onPublish: e.onPublish }) });
}
function zr(e) {
  return /* @__PURE__ */ i("div", { className: `${C.head} ${C.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: C.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(w, { role: Ra[e.run.status].role, label: Ra[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function dy(e, t) {
  const [a, r] = f(e.steps);
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
function uy(e) {
  var a;
  Yg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(zr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(ay, { sample: e.run.sample }),
    /* @__PURE__ */ n(Hr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(oy, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(rn, { items: e.checklist }) }),
    /* @__PURE__ */ n(sy, { reason: Ug(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function hy(e) {
  var r;
  const t = dy(e.run, e.feed);
  Jg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(zr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(ry, { sample: e.run.sample }),
    /* @__PURE__ */ n(Hr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(iy, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(rn, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(cy, { reason: Gg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function z3(e) {
  return Kg(e) ? /* @__PURE__ */ n(hy, { ...e }) : /* @__PURE__ */ n(uy, { ...e });
}
const my = "_list_142ip_3", wy = "_row_142ip_9", _y = "_condition_142ip_18", fy = "_action_142ip_24", Ot = {
  list: my,
  row: wy,
  condition: _y,
  action: fy
}, jr = $e(!1);
function j3({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(jr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Ot.list, "aria-label": t, children: e }) });
}
function W3({ rule: e }) {
  if (!pe(jr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: Ot.row, children: [
    /* @__PURE__ */ n(w, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Ot.condition, children: e.when }),
    /* @__PURE__ */ n(w, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Ot.action, children: e.then })
  ] });
}
const vy = "_move_tmppt_3", by = {
  move: vy
};
function Nn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function Wr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Kr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function xa(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function py(e) {
  return e === "up" ? "down" : "up";
}
function gy(e, t) {
  const a = xa(e, t.id, t.direction) ?? xa(e, t.id, py(t.direction));
  a == null || a.focus();
}
function Ur() {
  const e = v(null), [t, a] = f(null), [r, o] = f("");
  return S(() => {
    e.current !== null && t !== null && gy(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function Gr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Wt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${by.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const yy = "_body_1jd1i_2", Ny = "_title_1jd1i_8", ky = "_section_1jd1i_13", $y = "_legend_1jd1i_18", Cy = "_stages_1jd1i_26", Sy = "_stage_1jd1i_26", Ry = "_stageIndex_1jd1i_44", xy = "_stageName_1jd1i_50", Ty = "_footer_1jd1i_59", Ly = "_note_1jd1i_66", My = "_reason_1jd1i_71", Ay = "_actions_1jd1i_76", Ey = "_webHead_1jd1i_83", Iy = "_kicker_1jd1i_92", By = "_webTitle_1jd1i_99", Py = "_webBody_1jd1i_105", qy = "_webSection_1jd1i_109", Oy = "_sectionHead_1jd1i_121", Dy = "_sectionNote_1jd1i_129", Hy = "_formLabel_1jd1i_134", Fy = "_identityRow_1jd1i_139", zy = "_nameCell_1jd1i_145", jy = "_keyCell_1jd1i_150", Wy = "_colourCell_1jd1i_154", Ky = "_colourStatus_1jd1i_161", Uy = "_webStages_1jd1i_166", Gy = "_webStageList_1jd1i_172", Vy = "_webStage_1jd1i_166", Yy = "_webIndex_1jd1i_191", Jy = "_webStageName_1jd1i_196", Qy = "_webMoves_1jd1i_201", Xy = "_addStage_1jd1i_215", Zy = "_addStageButton_1jd1i_223", eN = "_webFooter_1jd1i_236", tN = "_webFooterNotes_1jd1i_244", nN = "_webNote_1jd1i_251", p = {
  body: yy,
  title: Ny,
  section: ky,
  legend: $y,
  stages: Cy,
  stage: Sy,
  stageIndex: Ry,
  stageName: xy,
  footer: Ty,
  note: Ly,
  reason: My,
  actions: Ay,
  webHead: Ey,
  kicker: Iy,
  webTitle: By,
  webBody: Py,
  webSection: qy,
  sectionHead: Oy,
  sectionNote: Dy,
  formLabel: Hy,
  identityRow: Fy,
  nameCell: zy,
  keyCell: jy,
  colourCell: Wy,
  colourStatus: Ky,
  webStages: Uy,
  webStageList: Gy,
  webStage: Vy,
  webIndex: Yy,
  webStageName: Jy,
  webMoves: Qy,
  addStage: Xy,
  addStageButton: Zy,
  webFooter: eN,
  webFooterNotes: tN,
  webNote: nN
}, aN = (e) => e, rN = [
  { value: "entry", label: "Entry" },
  { value: "agent", label: "Agent" },
  { value: "gate", label: "Review" },
  { value: "terminal", label: "Done" }
], Vr = "not a known stage";
function oN(e, t, a) {
  const r = e.map((o) => ({ value: o, label: a(o) }));
  return e.includes(t) ? r : [{ value: t, label: `${t ? a(t) : "(unnamed)"} · ${Vr}` }, ...r];
}
function lN({ stage: e, index: t, catalogue: a, label: r, onName: o }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: o });
  const s = a.includes(e.name) ? void 0 : `${e.name ? r(e.name) : "This stage"} is ${Vr}`;
  return /* @__PURE__ */ n(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: oN(a, e.name, r), invalid: s, onChange: o });
}
function Yr(e, t, a) {
  return e.name ? a(e.name) : `stage ${t + 1}`;
}
function iN(e) {
  const t = v([]), a = v(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function sN({ id: e, stage: t, index: a, total: r, catalogue: o, label: l, onReplace: s, onMove: c }) {
  const d = Yr(t, a, l), u = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: p.webStageName, children: /* @__PURE__ */ n(lN, { stage: t, index: a, catalogue: o, label: l, onName: (h) => s({ ...t, name: h }) }) }),
    /* @__PURE__ */ n(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: rN, onChange: (h) => s({ ...t, kind: h }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Wt, { id: e, name: d, direction: "up", onMove: () => c("up") }),
      a < r - 1 && /* @__PURE__ */ n(Wt, { id: e, name: d, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function cN({ stages: e, onChange: t, catalogue: a, stageLabel: r = aN }) {
  const o = iN(e.length), l = Ur(), s = (d, u) => {
    const h = Wr(d, u);
    o.current = Nn(o.current, d, h), l.moved({ id: o.current[h], direction: u }, Kr(Yr(e[d], d, r), h, e.length)), t(Nn(e, d, h));
  }, c = (d, u) => t(e.map((h, m) => m === d ? u : h));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((d, u) => /* @__PURE__ */ n(sN, { id: o.current[u], stage: d, index: u, total: e.length, catalogue: a, label: r, onReplace: (h) => c(u, h), onMove: (h) => s(u, h) }, o.current[u])) }),
    /* @__PURE__ */ n(Gr, { text: l.announcement }),
    /* @__PURE__ */ n("p", { className: p.addStage, children: /* @__PURE__ */ n("button", { type: "button", className: p.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const dN = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function uN({ stage: e }) {
  return e.gate && !kt(e.name, "Review") ? /* @__PURE__ */ n(w, { role: "gate", label: "Review" }) : null;
}
const hN = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve" },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer" },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it" }
], Jr = "Nothing runs until you create the stream", mN = "Add a name and a key", wN = "At least 2 stages";
function jn(e, t) {
  return !e.reserved && yt(e.step) && t[e.step] === void 0;
}
function _N(e, t) {
  const a = e.find((r) => jn(r, t));
  return a ? a.step : 1;
}
function fN({ stages: e, onMove: t }) {
  const a = Ur(), r = (o, l) => {
    const s = Wr(o, l);
    a.moved({ id: e[o].id, direction: l }, Kr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((o, l) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stageIndex, children: String(l + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: p.stageName, children: o.name }),
      /* @__PURE__ */ n(uN, { stage: o }),
      l > 0 && /* @__PURE__ */ n(Wt, { id: o.id, name: o.name, direction: "up", onMove: () => r(l, "up") }),
      l < e.length - 1 && /* @__PURE__ */ n(Wt, { id: o.id, name: o.name, direction: "down", onMove: () => r(l, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Gr, { text: a.announcement })
  ] });
}
function vN({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ n("p", { className: p.note, children: Jr }),
    e && /* @__PURE__ */ n("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function bN(e, t) {
  return e !== "" && t !== "" ? null : mN;
}
function pN(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = hN, onCreate: l, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, m] = f(""), [_, N] = f(""), [k, M] = f(t[0].value), [P, we] = f(() => _N(a, r)), [ae, Ce] = f(e.stages ?? dN), [Ze, A] = f(o[0].value), V = { name: h, key: _, streamStep: P, owner: k, stages: ae, policy: Ze }, Se = bN(h, _);
  return /* @__PURE__ */ n(ut, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ n("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Name", value: h, onChange: m }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: k, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ n(Dr, { label: "Colour", steps: a, value: P, onChange: we, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ n(fN, { stages: ae, onMove: (Ue, Lo) => Ce(Nn(ae, Ue, Lo)) })
    ] }),
    /* @__PURE__ */ n(Rr, { legend: "When items move on", options: o, value: Ze, onChange: A }),
    /* @__PURE__ */ n(vN, { reason: Se, onCreate: () => l(V), onDraft: () => s(V) })
  ] }) });
}
const gN = ["relay", "direct", "readonly"];
function yN(e) {
  return [
    { value: "relay", label: "Through Trellis (safe default)", consequence: `Agents never write to ${e} or Jira directly` },
    { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent" },
    { value: "readonly", label: "Read only", consequence: "Agents can read and report only" }
  ];
}
const NN = "Add a name, key, owner and two stages";
function kN(e, t, a, r, o, l) {
  const s = gN.find((c) => c === o) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: l };
}
function $N(e, t) {
  return CN(e) && SN(e, t) && RN(e);
}
function CN(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function SN(e, t) {
  return e.colourStep === null || jn({ step: e.colourStep }, t);
}
function RN(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function xN(e, t) {
  if (e === null || jn({ step: e }, t)) return "";
  const a = t[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function TN({ ready: e, draft: t, onCreate: a, onDraft: r, reasonId: o }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ n("p", { className: p.webNote, children: Jr }),
      !e && /* @__PURE__ */ n("p", { id: o, className: p.reason, children: NN })
    ] }),
    r && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => r(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => a(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: o, children: "Create stream" })
  ] });
}
function LN({ titleId: e }) {
  return /* @__PURE__ */ n("header", { className: p.webHead, children: /* @__PURE__ */ n("h2", { id: e, className: p.webTitle, children: "New stream" }) });
}
function MN({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: l }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ n("h3", { className: p.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ n("div", { className: p.nameCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: p.keyCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    l
  ] });
}
function AN(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, l] = f(""), [s, c] = f(""), [d, u] = f(e.owners[0] ?? ""), [h, m] = f(null), [_, N] = f("relay"), [k, M] = f([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), P = kN(o, s, d, h, _, k), we = $N(P, r), ae = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ n("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Dr, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: m, takenBy: r })
  ] }), Ce = xN(h, r), Ze = /* @__PURE__ */ i(x, { children: [
    Ce && /* @__PURE__ */ n("p", { className: p.colourStatus, "data-colour-status": "", children: Ce }),
    /* @__PURE__ */ n(I, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((A) => ({ value: A, label: A })), onChange: u })
  ] });
  return /* @__PURE__ */ i(ut, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(LN, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ n(MN, { name: o, setName: l, streamKey: s, setKey: c, colour: ae, owner: Ze }),
      e.fields && /* @__PURE__ */ n("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: p.kicker, children: "Stages" }),
          /* @__PURE__ */ n("span", { className: p.sectionNote, children: wN })
        ] }),
        /* @__PURE__ */ n(cN, { stages: k, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: p.webSection, children: /* @__PURE__ */ n(Rr, { variant: "cards", legend: "How agents write", value: _, options: yN(e.dataPlatform), onChange: N }) }),
      /* @__PURE__ */ n(TN, { ready: we, draft: P, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function K3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(AN, { ...e }) : /* @__PURE__ */ n(pN, { ...e });
}
const EN = "_row_bs8hc_2", IN = "_cell_bs8hc_6", BN = "_condition_bs8hc_11", PN = "_action_bs8hc_18", qN = "_contract_bs8hc_24", ON = "_contractCondition_bs8hc_33", DN = "_contractAction_bs8hc_39", ee = {
  row: EN,
  cell: IN,
  condition: BN,
  action: PN,
  contract: qN,
  contractCondition: ON,
  contractAction: DN
}, Qr = ["advance", "block", "escalate", "requestReview"], Ta = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Kt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Wn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ee.action, children: Ta[e.then] }) : /* @__PURE__ */ n(
    I,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: Qr.map((o) => ({ value: o, label: Ta[o] }))
    }
  );
}
function HN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(w, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Kt(e, r), children: Kt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(w, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: Wn(e, t, a) })
  ] });
}
function FN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(w, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Kt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: Wn(e, t, a) })
  ] });
}
function zN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(w, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Kt(e, r) }),
    /* @__PURE__ */ n(w, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: Wn(e, t, a, !0) })
  ] });
}
const jN = { two: FN, four: HN, contract: zN };
function U3(e) {
  var a;
  if (!Qr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = jN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const WN = "_column_g1uat_2", KN = "_head_g1uat_17", UN = "_index_g1uat_23", GN = "_name_g1uat_29", VN = "_meta_g1uat_38", YN = "_mono_g1uat_43", JN = "_gate_g1uat_50", QN = "_reviewersLabel_g1uat_57", XN = "_reviewers_g1uat_57", ZN = "_reviewer_g1uat_57", e1 = "_agents_g1uat_74", t1 = "_workflowColumn_g1uat_79", n1 = "_workflowHead_g1uat_96", a1 = "_stageRow_g1uat_102", r1 = "_stageLabel_g1uat_109", o1 = "_workflowTitle_g1uat_116", l1 = "_workflowMeta_g1uat_122", i1 = "_workflowGate_g1uat_127", s1 = "_gateNote_g1uat_135", c1 = "_cardNote_g1uat_140", d1 = "_reviewerList_g1uat_145", u1 = "_reviewerRow_g1uat_151", h1 = "_reviewerMark_g1uat_157", m1 = "_reviewerName_g1uat_167", w1 = "_terminalCard_g1uat_173", _1 = "_terminalCount_g1uat_182", f1 = "_workflowAgents_g1uat_188", v1 = "_mount_g1uat_194", R = {
  column: WN,
  head: KN,
  index: UN,
  name: GN,
  meta: VN,
  mono: YN,
  gate: JN,
  reviewersLabel: QN,
  reviewers: XN,
  reviewer: ZN,
  agents: e1,
  workflowColumn: t1,
  workflowHead: n1,
  stageRow: a1,
  stageLabel: r1,
  workflowTitle: o1,
  workflowMeta: l1,
  workflowGate: i1,
  gateNote: s1,
  cardNote: c1,
  reviewerList: d1,
  reviewerRow: u1,
  reviewerMark: h1,
  reviewerName: m1,
  terminalCard: w1,
  terminalCount: _1,
  workflowAgents: f1,
  mount: v1
}, La = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function Kn(e, t = String) {
  return e === void 0 ? "Unknown" : t(e);
}
function Xr(e) {
  return `${Math.round(e * 100)}%`;
}
function b1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(tn, { cells: [
      { value: Xr(e.gateShare), label: "Held for review" },
      { value: ne(e.count), label: "In stage" }
    ] })
  ] });
}
function p1({ stage: e }) {
  return /* @__PURE__ */ n(tn, { cells: [
    { value: ne(e.count), label: "In stage" },
    { value: Kn(e.closedThisWeek, ne), label: "Closed this week" }
  ] });
}
function g1({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    kt(e.name, La[e.kind]) ? null : /* @__PURE__ */ n(w, { role: e.kind === "gate" ? "gate" : "soft", label: La[e.kind] })
  ] });
}
function y1({ stage: e }) {
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
function N1({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(b1, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(p1, { stage: e }) : null;
}
function k1({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function $1({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), l = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(g1, { stage: e, titleId: o }),
    /* @__PURE__ */ n(y1, { stage: e }),
    /* @__PURE__ */ n(N1, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Ap, { ...s, connection: l }, s.agent.id)) }),
    /* @__PURE__ */ n(k1, { onMount: a })
  ] });
}
const C1 = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function S1({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function R1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.gateNote, children: t.length === 0 ? "A person moves items on" : "Needs approval from:" }),
    t.length === 0 ? null : /* @__PURE__ */ n(S1, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Xr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function x1(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function T1({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Kn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: x1(e.rolledBackThisWeek) })
  ] });
}
function L1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function M1(e) {
  if (e.kind === "terminal") return `${Kn(e.closedThisWeek)} this week`;
  const t = L1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function A1({ stage: e, titleId: t }) {
  const a = C1[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || kt(e.name, a.label) ? null : /* @__PURE__ */ n(w, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: M1(e) })
  ] });
}
function E1(e) {
  return e === "entry" || e === "agent";
}
function I1({ stage: e, onMount: t }) {
  return t === void 0 || !E1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Add agent" });
}
function B1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(A1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(R1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(T1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(I1, { stage: e, onMount: a })
  ] });
}
function P1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function G3(e) {
  return P1(e) ? /* @__PURE__ */ n(B1, { ...e }) : /* @__PURE__ */ n($1, { ...e });
}
const q1 = "_row_1tdra_6", O1 = "_name_1tdra_12", D1 = "_compactRow_1tdra_13", H1 = "_compactName_1tdra_13", F1 = "_cell_1tdra_30", z1 = "_chain_1tdra_45", j1 = "_owner_1tdra_51", W1 = "_mono_1tdra_57", K1 = "_compactCell_1tdra_79", U1 = "_stack_1tdra_96", G1 = "_stat_1tdra_103", V1 = "_identityLine_1tdra_110", Y1 = "_identity_1tdra_110", J1 = "_ownerLine_1tdra_140", Q1 = "_link_1tdra_160", X1 = "_gateMark_1tdra_166", Z1 = "_emptyChain_1tdra_171", ek = "_arrow_1tdra_177", tk = "_muted_1tdra_182", nk = "_define_1tdra_187", ak = "_statValue_1tdra_194", rk = "_policyId_1tdra_200", ok = "_sub_1tdra_205", g = {
  row: q1,
  name: O1,
  compactRow: D1,
  compactName: H1,
  cell: F1,
  chain: z1,
  owner: j1,
  mono: W1,
  compactCell: K1,
  stack: U1,
  stat: G1,
  identityLine: V1,
  identity: Y1,
  ownerLine: J1,
  link: Q1,
  gateMark: X1,
  emptyChain: Z1,
  arrow: ek,
  muted: tk,
  define: nk,
  statValue: ak,
  policyId: rk,
  sub: ok
};
function Zr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function lk(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function ik(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function eo(e) {
  return `${ne(e)} ${e === 1 ? "member" : "members"}`;
}
function sk(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${eo(e.members)}`;
}
function ck(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(w, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: sk(e) })
  ] }) });
}
function to({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(w, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function dk(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = en(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function uk({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, l) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(to, { name: o.name, gate: o.gate === !0, look: dk(l, a, t), size: "tag" }),
    l === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${l}`)) });
}
function hk(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : uk(e) });
}
function no(e) {
  return e === void 0 ? void 0 : !0;
}
function Ma(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": no(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function mk(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function wk(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function _k({ stream: e, href: t, presentation: a }) {
  const r = ik(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Zr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ke(e.streamStep, "chip") }, children: [
    ck(e, t),
    hk(e),
    Ma(wk(e.agents), e.agents === void 0 ? void 0 : lk(e.agents), "Unknown"),
    mk(e.policy),
    Ma(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "Unknown", e.inFlightHint)
  ] });
}
function fk(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function V3(e) {
  if (fk(e)) return _k(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Zr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(w, { ...Bn(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(w, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(to, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: eo(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": no(t.inFlightHint), children: ne(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : se(t.p50) }) })
  ] });
}
const vk = "_row_2u4ll_2", bk = "_name_2u4ll_16", pk = "_scope_2u4ll_24", Ut = {
  row: vk,
  name: bk,
  scope: pk
};
function Un(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function gk(e) {
  return e === void 0 ? `${Ut.row} ward-toolrow` : `${Ut.row} ward-toolrow ${e}`;
}
function yk(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "Locked by stream policy" };
}
function Nk({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function kk({ classification: e }) {
  return /* @__PURE__ */ n(w, { role: e === "write" ? "write" : "meta", label: Un(e) });
}
function $k({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Ut.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ck(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Y3({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), l = yk(e, a), s = Ck(a);
  return /* @__PURE__ */ i(s, { className: gk(a == null ? void 0 : a.className), "data-locked": l.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Nk, { id: r, reasonId: o, tool: e, state: l, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Ut.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n($k, { tool: e, state: l, reasonId: o }),
    /* @__PURE__ */ n(kk, { classification: e.classification }),
    l.locked ? /* @__PURE__ */ n(w, { role: "meta", label: "Locked" }) : null
  ] });
}
const Sk = "_strip_4ppv9_2", Rk = "_well_4ppv9_11", xk = "_head_4ppv9_18", Tk = "_name_4ppv9_24", Lk = "_chart_4ppv9_32", Mk = "_segment_4ppv9_38", Ak = "_detailedChart_4ppv9_44", Ek = "_rail_4ppv9_57", Ik = "_section_4ppv9_63", Bk = "_label_4ppv9_74", Pk = "_note_4ppv9_91", te = {
  strip: Sk,
  well: Rk,
  head: xk,
  name: Tk,
  chart: Lk,
  segment: Mk,
  detailedChart: Ak,
  rail: Ek,
  section: Ik,
  label: Bk,
  note: Pk
}, qk = "Nothing to preview.", kn = [1, 2, 3, 4, 5, 6], Gt = 100;
function Ok(e, t) {
  return t.has(e) ? ke(e, "id") : "var(--ward-color-line)";
}
function Dk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: te.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: kn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: te.segment,
      x: o * Gt,
      y: "0",
      width: Gt,
      height: "8",
      fill: Ok(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Hk(e) {
  const t = e.slice(0, kn.length);
  for (; t.length < kn.length; ) t.push({ key: "", name: "Unclaimed", streamStep: null });
  return t;
}
function Fk({ identities: e }) {
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
function ao(e) {
  return (t) => e == null ? void 0 : e(t);
}
function un({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: te.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: te.label, children: e }),
    t
  ] });
}
function zk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: te.note, children: t ?? qk }) : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(an, { item: { ...e, streamStep: en(a.streamStep) }, onOpen: ao(r), feed: null }) });
}
function jk({ draft: e }) {
  const t = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: te.head, style: t, children: [
    /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
    /* @__PURE__ */ n(w, { ...Bn(e.key, e.streamStep) })
  ] });
}
function Wk(e) {
  const t = Hk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: te.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(un, { label: "Board card", children: /* @__PURE__ */ n(zk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(un, { label: "Streams index row", children: /* @__PURE__ */ n(jk, { draft: a }) }),
    /* @__PURE__ */ n(un, { label: "Overview chart segment", children: /* @__PURE__ */ n(Fk, { identities: t }) })
  ] });
}
function Kk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: te.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ i("div", { className: te.head, children: [
      /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
      /* @__PURE__ */ n(w, { ...Bn(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(an, { item: { ...t, streamStep: e.streamStep }, onOpen: ao(r) }) }),
    /* @__PURE__ */ n(Dk, { draft: e, streams: a })
  ] });
}
function J3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Wk, { ...e }) : /* @__PURE__ */ n(Kk, { ...e });
}
const Uk = "_row_ixlg5_6", Gk = "_headCell_ixlg5_10", Vk = "_cell_ixlg5_11", Yk = "_name_ixlg5_23", Jk = "_consequence_ixlg5_29", Qk = "_governed_ixlg5_36", Xk = "_control_ixlg5_42", Zk = "_byRole_ixlg5_48", e$ = "_webControl_ixlg5_59", t$ = "_webConsequence_ixlg5_65", n$ = "_webGoverned_ixlg5_71", z = {
  row: Uk,
  headCell: Gk,
  cell: Vk,
  name: Yk,
  consequence: Jk,
  governed: Qk,
  control: Xk,
  byRole: Zk,
  webControl: e$,
  webConsequence: t$,
  webGoverned: n$
};
function a$({
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
function r$({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(a$, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function o$(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function l$({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${z.webControl} ${z.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Xe,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${z.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(w, { role: "running", label: "Pilot" }),
    r
  ] });
}
function i$({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: z.row, children: [
    /* @__PURE__ */ i("td", { className: z.cell, children: [
      /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${z.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(l$, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webGoverned} ward-cellmeta`, children: o$(e) }) })
  ] });
}
function Q3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(i$, { ...e }) : /* @__PURE__ */ n(r$, { ...e });
}
const s$ = "_row_vv64h_2", c$ = "_cell_vv64h_6", d$ = "_name_vv64h_25", u$ = "_note_vv64h_30", h$ = "_webName_vv64h_41", m$ = "_webMeta_vv64h_47", J = {
  row: s$,
  cell: c$,
  name: d$,
  note: u$,
  webName: h$,
  webMeta: m$
}, ro = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function w$(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function _$({ component: e, onRestart: t }) {
  const a = y(), r = ro[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: J.cell, "data-mono": "true", children: [
      ne(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(w, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { id: a, className: J.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: J.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function f$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: w$(e.state) });
}
function v$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(w, { ...ro[e.state] }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(f$, { component: e, onRestart: t }) })
  ] });
}
function X3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(v$, { ...e }) : /* @__PURE__ */ n(_$, { ...e });
}
const b$ = "_row_jcm5k_7", p$ = "_cell_jcm5k_11", g$ = "_next_jcm5k_28", y$ = "_headCell_jcm5k_38", N$ = "_webId_jcm5k_77", k$ = "_webPurpose_jcm5k_83", $$ = "_webMeta_jcm5k_91", C$ = "_webUrgent_jcm5k_97", W = {
  row: b$,
  cell: p$,
  next: g$,
  headCell: y$,
  webId: N$,
  webPurpose: k$,
  webMeta: $$,
  webUrgent: C$
}, S$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, R$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, oo = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], x$ = Object.fromEntries(oo.map((e) => [e.key, e]));
function tt({ column: e, children: t }) {
  const a = x$[e];
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
function Z3() {
  return /* @__PURE__ */ n("tr", { children: oo.map((e) => /* @__PURE__ */ n(
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
function T$({ cred: e }) {
  const t = S$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n(tt, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(tt, { column: "id", children: e.id }),
    /* @__PURE__ */ n(tt, { column: "state", children: /* @__PURE__ */ n(w, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(tt, { column: "cls", children: /* @__PURE__ */ n(w, { role: e.cls === "write" ? "write" : "meta", label: Un(e.cls) }) }),
    /* @__PURE__ */ n(tt, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(tt, { column: "next", children: /* @__PURE__ */ n("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function L$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function M$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(w, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(L$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(w, { ...R$[e.state] }) })
  ] });
}
function e4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(M$, { ...e }) : /* @__PURE__ */ n(T$, { ...e });
}
const A$ = "_card_lpp45_2", E$ = "_head_lpp45_11", I$ = "_env_lpp45_18", B$ = "_version_lpp45_25", P$ = "_meta_lpp45_32", q$ = "_webCard_lpp45_37", O$ = "_webRow_lpp45_47", D$ = "_webTitle_lpp45_55", H$ = "_webLine_lpp45_65", F$ = "_webVersion_lpp45_72", z$ = "_webMeta_lpp45_77", Y = {
  card: A$,
  head: E$,
  env: I$,
  version: B$,
  meta: P$,
  webCard: q$,
  webRow: O$,
  webTitle: D$,
  webLine: H$,
  webVersion: F$,
  webMeta: z$
}, Aa = { dev: "Dev", uat: "UAT", prod: "Prod" }, lo = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function j$({ env: e }) {
  const t = lo[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: Y.card, "aria-label": Aa[e.env], children: [
    /* @__PURE__ */ i("div", { className: Y.head, children: [
      /* @__PURE__ */ n("span", { className: Y.env, children: Aa[e.env] }),
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
function W$(e) {
  const t = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function K$(e) {
  return /* @__PURE__ */ i("article", { className: `${Y.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${Y.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Y.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(w, { ...lo[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Y.version} ${Y.webVersion} ${Y.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Y.meta} ${Y.webMeta} ${Y.webLine} ward-cellmeta`, children: W$(e) })
  ] });
}
function t4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(K$, { ...e }) : /* @__PURE__ */ n(j$, { ...e });
}
const U$ = "_panel_1hmja_2", G$ = "_line_1hmja_8", V$ = "_actions_1hmja_14", Lt = {
  panel: U$,
  line: G$,
  actions: V$
};
function n4(e) {
  return /* @__PURE__ */ i("div", { className: Lt.panel, children: [
    /* @__PURE__ */ n("p", { className: Lt.line, children: e.status }),
    /* @__PURE__ */ n(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Lt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Lt.line, children: e.note ?? "" })
  ] });
}
const Y$ = "_upload_13fcl_2", J$ = "_preview_13fcl_7", Q$ = "_mark_13fcl_17", X$ = "_empty_13fcl_22", Z$ = "_actions_13fcl_28", e0 = "_input_13fcl_33", t0 = "_reasons_13fcl_41", n0 = "_reason_13fcl_41", a0 = "_accepted_13fcl_57", re = {
  upload: Y$,
  preview: J$,
  mark: Q$,
  empty: X$,
  actions: Z$,
  input: e0,
  reasons: t0,
  reason: n0,
  accepted: a0
}, io = 1.5, so = 22, Vt = "script elements or event handlers", He = "links or external references", Ee = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${io}px at ${so}px`], r0 = [Ee[1], Ee[2], Vt, He], o0 = /* @__PURE__ */ new Map([
  ["image", Ee[1]],
  ["text", Ee[2]],
  ["tspan", Ee[2]],
  ["textPath", Ee[2]],
  ["script", Vt],
  ["foreignObject", Vt],
  ["a", He],
  ["use", He],
  ["style", He],
  ["feImage", He],
  ["set", He]
]), l0 = "http://www.w3.org/2000/svg", i0 = "http://www.w3.org/2000/xmlns/", s0 = /* @__PURE__ */ new Set([
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
]), c0 = /* @__PURE__ */ new Set([
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
]), Gn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, d0 = /url\s*\(|['"\\]/i;
function u0() {
  return { ok: !1, reasons: [Ee[1]] };
}
function co(e) {
  return e.namespaceURI === l0;
}
function h0(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && co(t) ? t : null;
  } catch {
    return null;
  }
}
function m0(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ee[0]] : [];
}
function w0(e) {
  return o0.get(e.localName) ?? (e.localName.startsWith("animate") ? He : void 0);
}
function _0(e) {
  return d0.test(e.replace(Gn, ""));
}
function f0(e) {
  return /^on/i.test(e.localName) ? Vt : e.localName === "href" || _0(e.value) ? He : void 0;
}
function v0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(w0(a));
    for (const r of Array.from(a.attributes)) t.add(f0(r));
  }
  return r0.filter((a) => t.has(a));
}
function b0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? so / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const l = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(l) && l * r < io;
  }) ? [Ee[3]] : [];
}
function p0(e) {
  if (e.namespaceURI === i0) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (c0.has(t) || t.startsWith("stroke"));
}
function g0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && co(t) && s0.has(t.localName);
}
function y0(e, t) {
  g0(t) ? t.nodeType === Node.ELEMENT_NODE && uo(t) : e.removeChild(t);
}
function uo(e) {
  for (const t of Array.from(e.attributes)) p0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) y0(e, t);
  return e;
}
function N0(e) {
  return Array.from(e.matchAll(Gn), (t) => t[2]).filter((t) => t !== "");
}
function k0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function $0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const l of N0(o.value)) a.has(l) || a.set(l, `${t}-${a.size}`);
  return a;
}
function C0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Gn, (r, o, l) => {
      const s = t.get(l);
      return s === void 0 ? r : r.replace(`#${l}`, `#${s}`);
    });
}
function S0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = $0(a, t);
  for (const o of a) {
    const l = r.get(o.getAttribute("id") ?? "");
    l === void 0 ? o.removeAttribute("id") : o.setAttribute("id", l), C0(o, r);
  }
  return e;
}
function a4(e) {
  const t = h0(e);
  if (t === null) return u0();
  const a = [...m0(t), ...v0(t), ...b0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(S0(uo(t), k0(e))) };
}
const R0 = "Mark accepted.", x0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, T0 = new Set(Va.flatMap((e) => [ke(e, "id"), ke(e, "chip")]));
function L0(e) {
  return e !== void 0 && (x0.test(e) || T0.has(e)) ? e : void 0;
}
function M0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: re.preview, style: { "--mark": L0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: re.empty }) });
}
function A0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function E0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function I0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("p", { className: re.accepted, children: R0 }) }) : /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: re.reason, children: t }, t)) }) });
}
function B0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(I0, { result: e }) : /* @__PURE__ */ n("p", { className: `${re.result} ${A0(e, a)}`, role: "status", children: E0(e, a) });
}
function Ea(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function r4({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const l = v(null), [s, c] = f(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ n(M0, { current: e }),
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
      /* @__PURE__ */ n(b, { ...Ea(o), onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...Ea(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(B0, { result: s, presentation: r })
  ] });
}
const P0 = "_row_o3t6y_7", q0 = "_cell_o3t6y_11", O0 = "_head_o3t6y_28", D0 = "_name_o3t6y_34", H0 = "_pinned_o3t6y_42", F0 = "_headCell_o3t6y_49", z0 = "_webName_o3t6y_88", j0 = "_webMeta_o3t6y_95", W0 = "_webWarn_o3t6y_103", D = {
  row: P0,
  cell: q0,
  head: O0,
  name: D0,
  pinned: H0,
  headCell: F0,
  webName: z0,
  webMeta: j0,
  webWarn: W0
}, Vn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, ho = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], K0 = Object.fromEntries(ho.map((e) => [e.key, e]));
function U0(e, t) {
  return `mcp.${e}.${t}`;
}
function G0(e) {
  return Object.keys(Vn).includes(e);
}
function V0(e) {
  return Vn[e !== void 0 && G0(e) ? e : "unknown"];
}
function mt({ column: e, children: t }) {
  const a = K0[e];
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
function o4() {
  return /* @__PURE__ */ n("tr", { children: ho.map((e) => /* @__PURE__ */ n(
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
function Y0({ server: e }) {
  const t = Vn[e.connection];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i(mt, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(w, { role: e.cls === "write" ? "write" : "meta", label: Un(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(mt, { column: "connection", children: /* @__PURE__ */ n(w, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(mt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(mt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(mt, { column: "tools", children: e.tools.map((a) => U0(e.name, a)).join(" · ") })
  ] });
}
function J0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Q0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function X0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function Z0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function eC({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function tC({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: J0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((l) => l.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(w, { ...Q0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(X0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(w, { ...V0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n(Z0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(eC, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function l4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(tC, { ...e }) : /* @__PURE__ */ n(Y0, { ...e });
}
const nC = "_row_zgozg_2", aC = "_headCell_zgozg_14", rC = "_cell_zgozg_15", oC = "_name_zgozg_26", lC = "_consequence_zgozg_32", iC = "_reason_zgozg_38", sC = "_value_zgozg_44", cC = "_webRow_zgozg_69", dC = "_webSetting_zgozg_82", uC = "_webName_zgozg_90", hC = "_webConsequence_zgozg_98", mC = "_webControl_zgozg_104", wC = "_webState_zgozg_118", _C = "_webChip_zgozg_123", O = {
  row: nC,
  headCell: aC,
  cell: rC,
  name: oC,
  consequence: lC,
  reason: iC,
  value: sC,
  webRow: cC,
  webSetting: dC,
  webName: uC,
  webConsequence: hC,
  webControl: mC,
  webState: wC,
  webChip: _C
}, mo = 104, wo = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function fC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Xe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n($r, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: O.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function vC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), l = wo[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: O.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: O.headCell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: O.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: O.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(fC, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: O.cell, style: { width: mo }, children: /* @__PURE__ */ n(w, { role: l.role, label: l.label }) })
  ] });
}
function _o(e, t) {
  return String(e ?? t);
}
function bC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function pC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? _o(e.value, "None");
}
function gC({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const l = e.value === !0;
  return /* @__PURE__ */ i("span", { className: O.webControl, children: [
    /* @__PURE__ */ n(Xe, { label: t, labelHidden: !0, checked: l, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: O.webState, "aria-hidden": "true", children: a || l ? "on" : "off" })
  ] });
}
function yC(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(gC, { ...e });
  const o = bC(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: O.webControl, "data-kind": "segment", children: /* @__PURE__ */ n($r, { options: o, value: _o(t.value, ""), onChange: (l) => r == null ? void 0 : r(l) }) }) : /* @__PURE__ */ n("span", { className: `${O.webControl} ${O.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: pC(t) });
}
function NC({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: l }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${O.row} ${O.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: O.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${O.name} ${O.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${O.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    l ? /* @__PURE__ */ n("span", { className: O.webControl, children: l(s) }) : /* @__PURE__ */ n(yC, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${O.webChip} ward-policy-chip`, style: { width: mo }, children: /* @__PURE__ */ n(w, { ...wo[a], size: "tag" }) })
  ] });
}
function i4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(NC, { ...e }) : /* @__PURE__ */ n(vC, { ...e });
}
const kC = "_label_1fzq1_7", $C = "_name_1fzq1_15", CC = "_column_1fzq1_24", SC = "_webFrame_1fzq1_57", RC = "_webHead_1fzq1_62", xC = "_webHeadLabel_1fzq1_74", TC = "_webLabel_1fzq1_118", LC = "_webColumns_1fzq1_125", MC = "_webGroup_1fzq1_131", AC = "_webPeople_1fzq1_132", EC = "_webVia_1fzq1_133", IC = "_webMeta_1fzq1_162", K = {
  label: kC,
  name: $C,
  column: CC,
  webFrame: SC,
  webHead: RC,
  webHeadLabel: xC,
  webLabel: TC,
  webColumns: LC,
  webGroup: MC,
  webPeople: AC,
  webVia: EC,
  webMeta: IC
}, BC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, hn = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function mn({ column: e, children: t }) {
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
function PC(e) {
  if (!e.matrixRole) return;
  const t = BC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function qC({ node: e }) {
  const t = PC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(OC, { role: t, node: e }),
    /* @__PURE__ */ n(mn, { column: hn[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(mn, { column: hn[1], children: e.people === void 0 ? "" : ne(e.people) }),
    /* @__PURE__ */ n(mn, { column: hn[2], children: e.requestedVia ?? "" })
  ] });
}
function OC({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(w, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(w, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(w, { role: "warn", label: "Unresolved" })
  ] });
}
function DC({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: l, children: s }) {
  return /* @__PURE__ */ n(
    Ar,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: l,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(qC, { node: a }),
      children: s
    }
  );
}
function wn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function HC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(wn, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "" }),
    /* @__PURE__ */ n(wn, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(wn, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function FC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ n("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function zC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(w, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(w, { role: "meta", label: "default" }) : null
  ] });
}
function jC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function WC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(FC, {}),
    /* @__PURE__ */ n(L_, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Ar,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(zC, { row: a }),
        detail: /* @__PURE__ */ n(HC, { row: a }),
        expanded: jC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function s4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(WC, { ...e }) : /* @__PURE__ */ n(DC, { ...e });
}
const KC = "_runbook_b9agc_2", UC = "_list_b9agc_7", GC = "_step_b9agc_15", VC = "_numeral_b9agc_21", YC = "_body_b9agc_28", JC = "_head_b9agc_34", QC = "_title_b9agc_40", XC = "_detail_b9agc_45", ZC = "_actions_b9agc_50", eS = "_webList_b9agc_56", tS = "_webStep_b9agc_60", nS = "_webBody_b9agc_66", aS = "_webTitle_b9agc_74", rS = "_webDetail_b9agc_78", B = {
  runbook: KC,
  list: UC,
  step: GC,
  numeral: VC,
  body: YC,
  head: JC,
  title: QC,
  detail: XC,
  actions: ZC,
  webList: eS,
  webStep: tS,
  webBody: nS,
  webTitle: aS,
  webDetail: rS
}, fo = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function vo(e) {
  return String(e + 1).padStart(2, "0");
}
function oS({ step: e, index: t, connection: a }) {
  const r = fo[e.state], o = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: B.numeral, children: vo(t) }),
    /* @__PURE__ */ i("span", { className: B.body, children: [
      /* @__PURE__ */ i("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
        /* @__PURE__ */ n(w, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: B.detail, children: e.detail })
    ] })
  ] });
}
function lS({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: B.list, children: e.map((r, o) => /* @__PURE__ */ n(oS, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: B.actions, children: t })
  ] });
}
function iS({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: vo(t) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(w, { ...fo[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function sS({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(iS, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${B.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function c4(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sS, { ...e }) : /* @__PURE__ */ n(lS, { ...e });
}
const cS = "_list_1gu6a_2", dS = "_check_1gu6a_10", uS = "_body_1gu6a_16", hS = "_text_1gu6a_23", mS = "_pending_1gu6a_32", wS = "_measured_1gu6a_37", rt = {
  list: cS,
  check: dS,
  body: uS,
  text: hS,
  pending: mS,
  measured: wS
};
function _S(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function fS({ check: e }) {
  const t = _S(e.passed);
  return /* @__PURE__ */ i("li", { className: `${rt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Dn, { state: t.state, label: t.label }),
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
function d4({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${rt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(fS, { check: t }, t.text)) });
}
const vS = "_root_y6bbq_2", bS = "_list_y6bbq_10", pS = "_line_y6bbq_32", gS = "_at_y6bbq_59", yS = "_text_y6bbq_63", NS = "_foot_y6bbq_67", kS = "_idle_y6bbq_79", $S = "_caret_y6bbq_87", CS = "_jump_y6bbq_94", ge = {
  root: vS,
  list: bS,
  line: pS,
  at: gS,
  text: yS,
  foot: NS,
  idle: kS,
  caret: $S,
  jump: CS
}, SS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function $n(e) {
  return Number.isNaN(Date.parse(e)) ? "" : SS.format(new Date(e));
}
const RS = { warn: "warning", ok: "ok" };
function xS({ kind: e }) {
  const t = RS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function TS({ connection: e, idleSince: t, last: a }) {
  return e === "stale" ? /* @__PURE__ */ n("span", { className: ge.idle, children: `Quiet since ${$n([t, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ n("span", { children: `Last event ${$n(a.at)}` });
}
function LS({ connection: e, idleSince: t, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${ge.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ge.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n(TS, { connection: e, idleSince: t, last: a }),
    r
  ] });
}
const MS = 8;
function AS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > MS;
}
function ES({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ge.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const bo = $e(null);
function u4({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = f(!1), l = za(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(bo.Provider, { value: l, children: a });
}
function IS() {
  const e = pe(bo), [t, a] = f(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const BS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function h4({ lines: e, connection: t, idleSince: a, label: r = "Activity", fixed: o }) {
  const l = v(null), [s, c] = f(0), [d, u] = IS(), [h, m] = f(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), Qe(() => {
    const k = l.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var P;
    const k = l.current;
    if (!k) return;
    const M = k.querySelectorAll("[data-consline-text]");
    (P = M.item(M.length - 1)) == null || P.focus(), m(!1);
  };
  return /* @__PURE__ */ i("div", { className: ge.root, children: [
    /* @__PURE__ */ n("ol", { className: ge.list, ref: l, "aria-live": d ? "polite" : "off", "aria-label": r, ...BS(e.length, o), onScroll: (k) => m(AS(k.currentTarget)), children: e.map((k, M) => /* @__PURE__ */ i("li", { className: `${ge.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": M < s, children: [
      /* @__PURE__ */ n("span", { className: ge.at, children: $n(k.at) }),
      /* @__PURE__ */ n(xS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: ge.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${M}`)) }),
    /* @__PURE__ */ i(LS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ge.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(ES, { shown: h, onJump: N })
    ] })
  ] });
}
const PS = "_row_1k8wl_2", qS = "_head_1k8wl_14", OS = "_author_1k8wl_20", DS = "_eta_1k8wl_25", HS = "_edited_1k8wl_26", FS = "_body_1k8wl_32", zS = "_reason_1k8wl_37", jS = "_actions_1k8wl_42", xe = {
  row: PS,
  head: qS,
  author: OS,
  eta: DS,
  edited: HS,
  body: FS,
  reason: zS,
  actions: jS
}, WS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function KS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function US({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: l }) {
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
function GS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: xe.reason, id: t, children: e })
  ] });
}
function VS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function YS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(US, { ...e }) : /* @__PURE__ */ n(GS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function m4(e) {
  const { comment: t } = e;
  VS(e);
  const a = y(), r = `${a}-unavailable`, o = WS[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${xe.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: xe.head, children: [
      /* @__PURE__ */ n("span", { className: xe.author, children: t.author }),
      /* @__PURE__ */ n(w, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: xe.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: xe.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: xe.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: xe.reason, id: a, children: KS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: xe.actions, children: /* @__PURE__ */ n(YS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const JS = "_root_lxbd7_2", QS = "_attach_lxbd7_11", XS = "_actions_lxbd7_17", ZS = "_reply_lxbd7_23", e2 = "_replyField_lxbd7_28", t2 = "_send_lxbd7_54", n2 = "_sendIcon_lxbd7_65", Je = {
  root: JS,
  attach: QS,
  actions: XS,
  reply: ZS,
  replyField: e2,
  send: t2,
  sendIcon: n2
};
function po({ value: e, onChange: t }) {
  const [a, r] = f("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function a2() {
  return /* @__PURE__ */ n("svg", { className: Je.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function r2(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function o2(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, l] = po(e), s = () => {
    o.trim() !== "" && r(a, o);
  }, c = (d) => {
    r2(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ n("div", { className: Je.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Je.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ n(I, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: l }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Je.send, onClick: s, children: [
      /* @__PURE__ */ n(a2, {}),
      /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function w4(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(o2, { ...e }) : /* @__PURE__ */ n(l2, { ...e });
}
function l2(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: l, onDraft: s } = e, [c, d] = po(e);
  return /* @__PURE__ */ i("div", { className: Je.root, children: [
    /* @__PURE__ */ n(I, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Je.attach, children: [
      /* @__PURE__ */ n(w, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      ar,
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
const i2 = "_list_1yhks_2", s2 = "_item_1yhks_6", c2 = "_body_1yhks_22", d2 = "_text_1yhks_28", u2 = "_evidence_1yhks_37", h2 = "_consequence_1yhks_49", lt = {
  list: i2,
  item: s2,
  body: c2,
  text: d2,
  evidence: u2,
  consequence: h2
};
function m2({ criterion: e }) {
  return /* @__PURE__ */ n(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ia({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function w2({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: lt.body, children: [
    /* @__PURE__ */ n("span", { className: lt.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ia, { text: " · " }),
      /* @__PURE__ */ n("code", { className: lt.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ia, { text: " · " }),
      /* @__PURE__ */ n("span", { className: lt.consequence, children: e.why })
    ] })
  ] });
}
function _2({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: lt.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(m2, { criterion: e }),
    /* @__PURE__ */ n(w2, { criterion: e })
  ] });
}
function _4({ criteria: e }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("ul", { className: `${lt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(_2, { criterion: t }, t.text)) }) });
}
const f2 = "_list_dwhoz_2", v2 = "_rung_dwhoz_6", b2 = "_name_dwhoz_18", p2 = "_actor_dwhoz_32", Dt = {
  list: f2,
  rung: v2,
  name: b2,
  actor: p2
}, g2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function y2({ rung: e }) {
  const t = g2[e.state];
  return /* @__PURE__ */ i("li", { className: Dt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Dt.name, children: e.name }),
    /* @__PURE__ */ n(w, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Dt.actor} ward-cellmeta`, children: e.actor })
  ] });
}
function f4({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Dt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(y2, { rung: t }, t.name)) });
}
const N2 = "_sheet_pw37w_2", k2 = "_title_pw37w_9", $2 = "_stage_pw37w_15", C2 = "_effects_pw37w_20", S2 = "_effect_pw37w_20", R2 = "_numeral_pw37w_31", x2 = "_effectText_pw37w_38", T2 = "_refusals_pw37w_43", L2 = "_reasons_pw37w_52", M2 = "_reason_pw37w_52", A2 = "_actions_pw37w_62", _e = {
  sheet: N2,
  title: k2,
  stage: $2,
  effects: C2,
  effect: S2,
  numeral: R2,
  effectText: x2,
  refusals: T2,
  reasons: L2,
  reason: M2,
  actions: A2
};
function E2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function v4({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: l, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = f(""), m = a.length > 0;
  return /* @__PURE__ */ n(ut, { kind: "sheet", labelledBy: c, onClose: l, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: _e.sheet, children: [
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
      dw,
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
      /* @__PURE__ */ n(E2, { refused: m, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: l, children: "Cancel" })
    ] })
  ] }) });
}
const I2 = "_list_1laeg_2", B2 = "_path_1laeg_7", P2 = "_consequence_1laeg_35", Cn = {
  list: I2,
  path: B2,
  consequence: P2
}, Ba = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function q2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Pa(e) {
  return e ? "primary" : "secondary";
}
function O2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Pa(t), size: "sm", onClick: () => a(e.kind), children: Ba[e.kind] }) : /* @__PURE__ */ n(b, { variant: Pa(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Ba[e.kind] });
}
function D2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: Cn.path, "data-allowed": e.allowed, "data-role": q2(e.requiredRole), children: [
    /* @__PURE__ */ n("span", { className: Cn.consequence, children: e.consequence }),
    /* @__PURE__ */ n(O2, { path: e, primary: t, onChoose: a })
  ] });
}
function b4({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: Cn.list, children: e.map((a, r) => /* @__PURE__ */ n(D2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const H2 = "_list_1m7i0_2", F2 = "_item_1m7i0_6", z2 = "_node_1m7i0_18", j2 = "_body_1m7i0_24", W2 = "_head_1m7i0_30", K2 = "_stage_1m7i0_36", U2 = "_version_1m7i0_41", G2 = "_sentence_1m7i0_49", V2 = "_meta_1m7i0_54", Le = {
  list: H2,
  item: F2,
  node: z2,
  body: j2,
  head: W2,
  stage: K2,
  version: U2,
  sentence: G2,
  meta: V2
}, Y2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function J2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Le.head, children: [
    /* @__PURE__ */ n("span", { className: Le.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Le.version, title: e.version, children: e.version }) : null
  ] });
}
function Q2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Le.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Le.node} ward-history-node`, children: /* @__PURE__ */ n(Ke, { size: 9, kind: Y2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Le.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(J2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Le.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Le.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function p4({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Le.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(Q2, { entry: t }, t.stage + String(a))) });
}
const X2 = "_thread_1dsr3_3", Z2 = "_turn_1dsr3_8", eR = "_who_1dsr3_27", tR = "_body_1dsr3_32", nR = "_working_1dsr3_75", aR = "_dots_1dsr3_84", rR = "_step_1dsr3_84", oR = "_note_1dsr3_96", fe = {
  thread: X2,
  turn: Z2,
  who: eR,
  body: tR,
  working: nR,
  dots: aR,
  step: rR,
  note: oR
}, Yn = $e(!1);
function g4({ children: e, density: t }) {
  return /* @__PURE__ */ n(Yn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${fe.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function y4({ turn: e }) {
  if (!pe(Yn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${fe.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: e.body })
  ] });
}
function lR() {
  return /* @__PURE__ */ i("span", { className: fe.dots, "aria-hidden": "true", "data-dots": "true", children: [
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" })
  ] });
}
function iR({ step: e, note: t }) {
  return /* @__PURE__ */ i("span", { role: "status", className: fe.step, children: [
    e === "" ? null : /* @__PURE__ */ n("span", { children: e }),
    t ? /* @__PURE__ */ n("span", { className: fe.note, children: t }) : null
  ] });
}
function N4({ author: e, step: t, body: a = "", note: r }) {
  if (!pe(Yn)) throw new Error("ChatWorking: must be rendered inside a Conversation");
  const o = a !== "";
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": "agent", "data-turn": "agent", "data-working": "true", children: [
    /* @__PURE__ */ n("span", { className: `${fe.who} ward-chat-who`, children: e }),
    /* @__PURE__ */ i("p", { className: `${fe.working} ward-chat-working`, children: [
      o ? null : /* @__PURE__ */ n(lR, {}),
      /* @__PURE__ */ n(iR, { step: t, note: r })
    ] }),
    o ? /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: a }) : null
  ] });
}
const sR = "_list_yiolt_3", cR = "_row_yiolt_7", dR = "_label_yiolt_20", uR = "_n_yiolt_26", hR = "_cause_yiolt_33", bt = {
  list: sR,
  row: cR,
  label: dR,
  n: uR,
  cause: hR
};
function mR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const wR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function _R({ row: e, formatNumber: t }) {
  return mR(e), /* @__PURE__ */ i("li", { className: `${bt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ke, { size: 8, ...wR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: bt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${bt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(fR, { cause: e.cause })
  ] });
}
function fR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${bt.cause} ward-healthrow-cause`, children: e }) : null;
}
function k4({ rows: e, formatNumber: t = ne }) {
  return /* @__PURE__ */ n("ul", { className: `${bt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(_R, { row: a, formatNumber: t }, a.label)) });
}
const vR = "_root_1jxwp_2", bR = {
  root: vR
};
function $4({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: bR.root, "data-density": o, children: [
    /* @__PURE__ */ n(rn, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const pR = "_row_dhbre_3", gR = "_key_dhbre_13", yR = "_stack_dhbre_24", NR = "_value_dhbre_32", kR = "_evidence_dhbre_39", $R = "_mark_dhbre_47", nt = {
  row: pR,
  key: gR,
  stack: yR,
  value: NR,
  evidence: kR,
  mark: $R
};
function CR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(w, { role: "warn", label: "Check" }) : /* @__PURE__ */ n(Dn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function C4({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${nt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${nt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${nt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${nt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${nt.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${nt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(CR, { state: e.state }) })
  ] });
}
const SR = "_cell_gh2sd_2", RR = {
  cell: SR
}, xR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function TR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "None";
}
function LR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function MR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: TR(e),
    skips: e.skips ?? "None",
    typedInput: e.typedInput
  }[t];
}
function AR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function S4({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  LR(e, a);
  const r = AR(e);
  return /* @__PURE__ */ n(
    $w,
    {
      label: "Rejection rules",
      columns: xR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, l) => /* @__PURE__ */ n("span", { className: RR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: MR(o, l) }),
      empty: t ?? /* @__PURE__ */ n(vf, { sentence: "No rejection rules yet." })
    }
  );
}
const ER = "_row_1f2re_2", IR = "_title_1f2re_12", BR = "_turns_1f2re_18", PR = "_waiting_1f2re_19", qR = "_resolved_1f2re_20", OR = "_activity_1f2re_21", DR = "_cost_1f2re_28", HR = "_link_1f2re_29", FR = "_tableLink_1f2re_47", zR = "_tableRecord_1f2re_48", jR = "_tableRow_1f2re_59", WR = "_tableTitle_1f2re_71", KR = "_tableResolved_1f2re_76", UR = "_tableMeta_1f2re_87", GR = "_tableCost_1f2re_94", VR = "_tableActivity_1f2re_95", YR = "_tableState_1f2re_105", F = {
  row: ER,
  title: IR,
  turns: BR,
  waiting: PR,
  resolved: qR,
  activity: OR,
  cost: DR,
  link: HR,
  tableLink: FR,
  tableRecord: zR,
  tableRow: jR,
  tableTitle: WR,
  tableResolved: KR,
  tableMeta: UR,
  tableCost: GR,
  tableActivity: VR,
  tableState: YR
}, go = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function JR(e) {
  if (e === "") return "";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function QR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function XR(e) {
  const t = e.join(", ");
  return t === "" ? "None" : t;
}
const ZR = { duplicate: "Closed · duplicate" };
function ex({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(st, { className: F.tableMeta, text: `waiting on ${e}` });
}
function tx({ value: e }) {
  return /* @__PURE__ */ n("td", { className: F.tableCost, children: e === void 0 ? null : oe(e) });
}
function nx({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${F.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function ax({ session: e, href: t }) {
  const a = go[e.state];
  return /* @__PURE__ */ i("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${F.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(st, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: F.tableMeta, children: QR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: F.tableResolved, children: [
      XR(e.resolved),
      /* @__PURE__ */ n(ex, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(tx, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: F.tableActivity, children: JR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: F.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(w, { role: a.role, label: ZR[e.state] ?? a.label }),
      /* @__PURE__ */ n(nx, { link: e.link })
    ] }) })
  ] });
}
function rx({ session: e }) {
  const t = go[e.state];
  return /* @__PURE__ */ i("div", { className: F.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(st, { className: F.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: F.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(st, { className: F.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: F.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: F.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ n("span", { className: F.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: F.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(w, { role: t.role, label: t.label })
  ] });
}
function R4(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(ax, { session: e.session, href: e.href }) : /* @__PURE__ */ n(rx, { session: e.session });
}
const ox = "_block_1yy2v_3", lx = "_list_1yy2v_9", ix = "_line_1yy2v_14", Sn = {
  block: ox,
  list: lx,
  line: ix
}, sx = { warn: "warning", ok: "ok" };
function cx({ kind: e }) {
  const t = sx[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function dx({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${Sn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(cx, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function x4({ lines: e, label: t = "Agent input" }) {
  return /* @__PURE__ */ n("div", { className: `${Sn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Sn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(dx, { line: a }, `${r}-${a.text}`)) }) });
}
const ux = "_band_tt7hp_1", hx = "_head_tt7hp_8", mx = "_cell_tt7hp_19", wx = "_index_tt7hp_35", _x = "_title_tt7hp_42", fx = "_note_tt7hp_48", vx = "_cellTitle_tt7hp_53", bx = "_cellBody_tt7hp_58", px = "_tag_tt7hp_64", Re = {
  band: ux,
  head: hx,
  cell: mx,
  index: wx,
  title: _x,
  note: fx,
  cellTitle: vx,
  cellBody: bx,
  tag: px
}, qa = 4;
function T4({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== qa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${qa}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Re.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: Re.head, children: [
      /* @__PURE__ */ n("span", { className: Re.index, children: e }),
      /* @__PURE__ */ n("span", { className: Re.title, children: t }),
      /* @__PURE__ */ n("span", { className: Re.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ i("div", { className: Re.cell, children: [
      /* @__PURE__ */ n("span", { className: Re.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: Re.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: Re.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const gx = "_tag_1yuvz_2", yx = "_link_1yuvz_14", _n = {
  tag: gx,
  link: yx
};
function yo({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: _n.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${_n.tag} ${_n.link}`, href: T(t), children: e });
}
const Nx = "_eyebrow_m8swv_2", kx = "_link_m8swv_10", Oa = {
  eyebrow: Nx,
  link: kx
};
function on({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: Oa.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${Oa.link} ward-target`, href: T(t), children: e }) });
}
const $x = "_figure_qz9i7_2", Cx = "_media_qz9i7_9", Sx = "_caption_qz9i7_35", fn = {
  figure: $x,
  media: Cx,
  caption: Sx
};
function Rx(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Rn(e) {
  return /* @__PURE__ */ i("figure", { className: fn.figure, children: [
    /* @__PURE__ */ n("div", { className: fn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(Rx, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: fn.caption, children: e.caption })
  ] });
}
function $t(e) {
  return `h${e}`;
}
function xx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const Tx = "_prose_1fxb9_2", Lx = "_anchor_1fxb9_79", No = {
  prose: Tx,
  anchor: Lx
};
function xn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: No.prose, children: e });
}
function L4({ level: e, children: t, id: a }) {
  const r = $t(e), o = a ?? xx(t);
  return /* @__PURE__ */ i(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${No.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const Mx = "_list_176jq_2", Ax = "_pair_176jq_8", Ex = "_term_176jq_14", Ix = "_value_176jq_19", Mt = {
  list: Mx,
  pair: Ax,
  term: Ex,
  value: Ix
};
function Bx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Mt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: Mt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Mt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Mt.value, children: t.value })
  ] }, t.term)) });
}
const Px = "_nav_sgeyg_2", qx = "_item_sgeyg_6", Ox = "_link_sgeyg_13", Dx = "_note_sgeyg_30", At = {
  nav: Px,
  item: qx,
  link: Ox,
  note: Dx
};
function Hx({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: At.nav, children: /* @__PURE__ */ n(Rw, { children: t.map((a) => /* @__PURE__ */ i("li", { className: At.item, children: [
    /* @__PURE__ */ n("a", { className: `${At.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: At.note, children: a.note })
  ] }, a.href)) }) });
}
const Fx = "_header_kelio_2", zx = "_skip_kelio_14", jx = "_brand_kelio_39", Wx = "_list_kelio_46", Kx = "_link_kelio_56", at = {
  header: Fx,
  skip: zx,
  brand: jx,
  list: Wx,
  link: Kx
};
function M4({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: l = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: at.header, children: [
    /* @__PURE__ */ n("a", { className: at.skip, href: `#${o}`, children: l }),
    /* @__PURE__ */ n("a", { className: `${at.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: at.nav, children: /* @__PURE__ */ n("ul", { className: at.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${at.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const Ux = "_footer_1jb5e_2", Gx = "_note_1jb5e_12", Vx = "_list_1jb5e_18", Yx = "_link_1jb5e_27", Et = {
  footer: Ux,
  note: Gx,
  list: Vx,
  link: Yx
};
function A4({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: Et.footer, children: [
    /* @__PURE__ */ n("p", { className: Et.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Et.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Et.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const Jx = "_intro_13128_2", Qx = "_title_13128_9", Xx = "_lead_13128_17", vn = {
  intro: Jx,
  title: Qx,
  lead: Xx
};
function Jn({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: l }) {
  const s = $t(o);
  return /* @__PURE__ */ i("header", { className: vn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(on, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: vn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: vn.lead, children: r }),
    l
  ] });
}
const Zx = "_section_u0k7p_2", eT = "_head_u0k7p_13", tT = "_titles_u0k7p_21", nT = "_title_u0k7p_21", aT = "_link_u0k7p_34", ft = {
  section: Zx,
  head: eT,
  titles: tT,
  title: nT,
  link: aT
};
function rT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const l = $t(o);
  return /* @__PURE__ */ i("div", { className: ft.head, children: [
    /* @__PURE__ */ i("div", { className: ft.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(on, { children: a }),
      /* @__PURE__ */ n(l, { className: ft.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ft.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function E4({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: l = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: ft.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(rT, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: l }),
    t
  ] });
}
const oT = "_split_1ycaa_2", lT = "_main_1ycaa_10", iT = "_aside_1ycaa_15", bn = {
  split: oT,
  main: lT,
  aside: iT
};
function sT({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: bn.split, children: [
    /* @__PURE__ */ n("div", { className: bn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: bn.aside, "aria-label": a, children: t })
  ] });
}
const cT = "_hero_ehbct_2", dT = "_text_ehbct_11", uT = "_visual_ehbct_23", hT = "_title_ehbct_28", mT = "_lead_ehbct_36", wT = "_actions_ehbct_42", _T = "_action_ehbct_42", fT = "_primary_ehbct_63", vT = "_secondary_ehbct_72", Ie = {
  hero: cT,
  text: dT,
  visual: uT,
  title: hT,
  lead: mT,
  actions: wT,
  action: _T,
  primary: fT,
  secondary: vT
};
function bT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ie.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ie.action} ${a === 0 ? Ie.primary : Ie.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function pT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ie.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(on, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ie.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ie.lead, children: a }),
    /* @__PURE__ */ n(bT, { actions: r })
  ] });
}
function I4({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ie.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(pT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ie.visual, children: e })
  ] });
}
const gT = "_chain_w2k2l_2", yT = "_step_w2k2l_12", NT = "_arrow_w2k2l_19", kT = "_box_w2k2l_24", It = {
  chain: gT,
  step: yT,
  arrow: NT,
  box: kT
};
function B4({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: It.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, o) => /* @__PURE__ */ i("li", { className: It.step, style: { "--ward-step": o }, children: [
    o === 0 ? null : /* @__PURE__ */ n("span", { className: It.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: It.box, children: r })
  ] }, o)) });
}
const $T = "_card_1u2gr_2", CT = "_featured_1u2gr_20", ST = "_media_1u2gr_28", RT = "_body_1u2gr_32", xT = "_title_1u2gr_48", TT = "_link_1u2gr_60", LT = "_summary_1u2gr_78", MT = "_tags_1u2gr_84", AT = "_cta_1u2gr_90", ve = {
  card: $T,
  featured: CT,
  media: ST,
  body: RT,
  title: xT,
  link: TT,
  summary: LT,
  tags: MT,
  cta: AT
};
function ko({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: ve.media, children: /* @__PURE__ */ n(Rn, { ratio: t, children: e }) });
}
function ET({ href: e, title: t, headingLevel: a = 3 }) {
  const r = $t(a);
  return /* @__PURE__ */ n(r, { className: ve.title, children: /* @__PURE__ */ n("a", { className: ve.link, href: T(e), children: t }) });
}
function $o({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(on, { children: e }),
    /* @__PURE__ */ n(ET, { ...t })
  ] });
}
function Co({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: ve.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: ve.tags, children: t.map((a) => /* @__PURE__ */ n(yo, { label: a }, a)) })
  ] });
}
function P4({ media: e, ratio: t, eyebrow: a, summary: r, tags: o, ...l }) {
  return /* @__PURE__ */ i("article", { className: ve.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(ko, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n($o, { eyebrow: a, ...l }),
      /* @__PURE__ */ n(Co, { summary: r, tags: o })
    ] })
  ] });
}
function q4({ media: e, ratio: t, eyebrow: a, summary: r, tags: o, cta: l, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${ve.card} ${ve.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(ko, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n($o, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(Co, { summary: r, tags: o }),
      l === void 0 ? null : /* @__PURE__ */ i("span", { className: ve.cta, "aria-hidden": "true", children: [
        l,
        " →"
      ] })
    ] })
  ] });
}
const IT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function So(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${IT[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const BT = "_row_1peme_2", PT = "_title_1peme_15", qT = "_link_1peme_23", OT = "_meta_1peme_40", DT = "_summary_1peme_46", wt = {
  row: BT,
  title: PT,
  link: qT,
  meta: OT,
  summary: DT
};
function O4({ href: e, title: t, date: a, meta: r, summary: o, headingLevel: l = 3 }) {
  const s = $t(l);
  return /* @__PURE__ */ i("article", { className: wt.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: wt.title, children: /* @__PURE__ */ n("a", { className: wt.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: wt.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: So(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    o === void 0 ? null : /* @__PURE__ */ n("p", { className: wt.summary, children: o })
  ] });
}
const HT = "_list_dd8kj_2", FT = "_item_dd8kj_16", Da = {
  list: HT,
  item: FT
};
function D4({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Da.list, role: "list", "aria-label": a, "data-rules": t, children: Wa.toArray(e).map((r, o) => /* @__PURE__ */ n("li", { className: Da.item, children: r }, o)) });
}
const zT = "_page_i3r2z_2", jT = "_aside_i3r2z_8", WT = "_tags_i3r2z_13", Qn = {
  page: zT,
  aside: jT,
  tags: WT
};
function KT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Qn.tags, children: e.map((t) => /* @__PURE__ */ n(yo, { label: t }, t)) });
}
function UT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function GT(e) {
  return e.filter(UT).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(KT, { labels: a })
  }));
}
function VT({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Qn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(Bx, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(Hx, { label: a, links: t })
  ] });
}
function Ro({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: o }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(xn, { children: o }) : /* @__PURE__ */ n(sT, { asideLabel: r, aside: /* @__PURE__ */ n(VT, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(xn, { children: o }) });
}
function H4({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: o, role: l, period: s, focus: c, stack: d, related: u }) {
  const h = GT([
    ["Role", l],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Qn.page, children: [
    /* @__PURE__ */ n(Jn, { title: e, lead: t, eyebrow: r, eyebrowHref: o }),
    /* @__PURE__ */ n(Ro, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const YT = "_page_1junb_2", JT = "_source_1junb_8", QT = "_shots_1junb_30", Tn = {
  page: YT,
  source: JT,
  shots: QT
};
function XT({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Rn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: Tn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Rn, { ...a, ratio: t }) }, r)) });
}
function F4(e) {
  const { title: t, summary: a, children: r, source: o, facts: l = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: Tn.page, children: [
    /* @__PURE__ */ n(Jn, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: Tn.source, href: T(o.href), children: o.label }) }),
    /* @__PURE__ */ n(XT, { shots: s, ratio: c }),
    /* @__PURE__ */ n(Ro, { facts: l, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function ZT(e) {
  const t = [], a = [];
  for (const r of e) {
    const o = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const l = a[a.length - 1];
    (l === void 0 ? t : l.children).push(o), a.push(o);
  }
  return t;
}
const eL = "_article_drsu4_2", tL = "_meta_drsu4_8", nL = "_tldr_drsu4_14", aL = "_tldrLabel_drsu4_21", rL = "_tldrText_drsu4_27", oL = "_toc_drsu4_40", lL = "_tocTitle_drsu4_44", iL = "_tocList_drsu4_50", sL = "_tocLink_drsu4_65", Be = {
  article: eL,
  meta: tL,
  tldr: nL,
  tldrLabel: aL,
  tldrText: rL,
  toc: oL,
  tocTitle: lL,
  tocList: iL,
  tocLink: sL
};
function cL({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Be.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: So(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function dL({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Be.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Be.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Be.tldrText, children: e })
  ] });
}
function xo({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Be.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Be.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(xo, { nodes: t.children })
  ] }, t.id)) });
}
function uL({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Be.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Be.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(xo, { nodes: ZT(e) })
  ] });
}
function z4({ title: e, date: t, children: a, minutes: r, tldr: o, headings: l = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Be.article, children: [
    /* @__PURE__ */ n(Jn, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(cL, { date: t, minutes: r }) }),
    o === void 0 ? null : /* @__PURE__ */ n(dL, { children: o }),
    /* @__PURE__ */ n(uL, { headings: l }),
    /* @__PURE__ */ n(xn, { children: a })
  ] });
}
const hL = 220;
function mL(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function j4(e) {
  return Math.max(1, Math.ceil(mL(e) / hL));
}
const Yt = { w: 184, h: 96 }, ct = { w: 152, h: 48 }, Jt = 16, Bt = (e) => Math.round(e * 10) / 10;
function To(e) {
  return { x: Jt + e.col * Yt.w, y: Jt + e.row * Yt.h, w: ct.w, h: ct.h };
}
function wL(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Jt + t * Yt.w + ct.w, h: 2 * Jt + a * Yt.h + ct.h };
}
function Ha(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function _L(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, o = t.x + t.w / 2 - a, l = t.y + t.h / 2 - r, s = Ha(e, o, l), c = 1 - Ha(t, o, l);
  return { x1: Bt(a + o * s), y1: Bt(r + l * s), x2: Bt(a + o * c), y2: Bt(r + l * c) };
}
function fL() {
  const [e, t] = f(!1);
  return S(() => {
    var o;
    const a = (o = window.matchMedia) == null ? void 0 : o.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (l) => t(l.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const vL = "_diagram_76e4t_2", bL = "_label_76e4t_9", pL = "_svg_76e4t_14", gL = "_node_76e4t_20", yL = "_edge_76e4t_33", NL = "_arrow_76e4t_38", kL = "_controls_76e4t_63", $L = "_live_76e4t_70", CL = "_steps_76e4t_77", Me = {
  diagram: vL,
  label: bL,
  svg: pL,
  node: gL,
  edge: yL,
  arrow: NL,
  controls: kL,
  live: $L,
  steps: CL
};
function SL({ nodes: e, edges: t, lit: a, marker: r }) {
  const o = new Map(e.map((l) => [l.id, To(l)]));
  return t.map((l) => {
    const s = o.get(l.from), c = o.get(l.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(l.from) && a(l.to);
    return /* @__PURE__ */ n("line", { className: Me.edge, "data-active": d, ..._L(s, c), markerEnd: `url(#${r})` }, `${l.from}>${l.to}`);
  });
}
function RL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = To(a);
    return /* @__PURE__ */ i("g", { className: Me.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + ct.w / 2, y: r.y + ct.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Fa({ label: e, to: t, count: a, go: r, status: o }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: o, children: e }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => r(t), children: e });
}
function xL({ at: e, count: t, text: a, go: r }) {
  const o = y();
  return /* @__PURE__ */ i("div", { className: Me.controls, children: [
    /* @__PURE__ */ n(Fa, { label: "Back", to: e - 1, count: t, go: r, status: o }),
    /* @__PURE__ */ n(Fa, { label: "Next", to: e + 1, count: t, go: r, status: o }),
    /* @__PURE__ */ n("p", { className: Me.live, id: o, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function W4({ label: e, nodes: t, edges: a, steps: r }) {
  const o = fL() && r.length > 0, [l, s] = f(0), c = y(), d = (h) => o && r[l].nodes.includes(h), u = wL(t);
  return /* @__PURE__ */ i("figure", { className: Me.diagram, "data-live": o, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Me.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Me.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Me.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(SL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(RL, { nodes: t, lit: d })
    ] }),
    o ? /* @__PURE__ */ n(xL, { at: l, count: r.length, text: r[l].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Me.steps, children: r.map((h, m) => /* @__PURE__ */ n("li", { "aria-current": o && m === l ? "step" : void 0, children: h.text }, m)) })
  ] });
}
export {
  DL as ACCENT_PRESETS,
  h3 as ActionStack,
  h4 as ActivityConsole,
  VL as AdminIcon,
  Ap as AgentCard,
  W4 as AnimatedDiagram,
  JL as AppShell,
  J3 as AppearanceStrip,
  z4 as Article,
  T4 as Band,
  d3 as BarChart,
  Xf as BoardColumn,
  T3 as BoardFootnote,
  L3 as BoardHeader,
  UL as BoardIcon,
  g3 as BoardScroller,
  b as Btn,
  OL as CHIP_ROLES,
  FL as CONTRASTS,
  oo as CREDENTIAL_COLUMNS,
  l3 as Callout,
  Q3 as CapabilityRow,
  N3 as CardGrid,
  H4 as CaseStudy,
  y4 as ChatMessage,
  N4 as ChatWorking,
  ar as Checkbox,
  w as Chip,
  st as ClampText,
  m4 as ClarificationRow,
  H3 as ClauseRuleRow,
  D3 as ClauseRules,
  Dr as ColourLadder,
  X3 as ComponentRow,
  w4 as Composer,
  A3 as ConfigRow,
  M3 as ConfigRowHead,
  Hn as ConnectionMark,
  u4 as ConsoleAnnounceProvider,
  g4 as Conversation,
  i3 as CopyValue,
  dw as CostMeter,
  e4 as CredentialRow,
  Z3 as CredentialRowHead,
  _4 as CriteriaList,
  _c as Crumb,
  HL as DENSITIES,
  k4 as DeliveryHealth,
  $3 as DeniedState,
  WL as DisabledScope,
  z3 as DryRunRail,
  vf as EmptyState,
  t4 as EnvCard,
  on as Eyebrow,
  Bx as FactList,
  q4 as FeaturedCard,
  I as Field,
  Rn as Figure,
  k3 as FilteredEmpty,
  B4 as FlowChain,
  QL as FoldText,
  b3 as FormStack,
  rn as GateChecklist,
  f4 as GateLadder,
  $w as Grid,
  W3 as HandoffRuleRow,
  j3 as HandoffRules,
  I4 as Hero,
  KL as HomeIcon,
  s3 as InfoTip,
  E3 as ItemDrawer,
  n4 as KeyPanel,
  Jo as LIVE_EVENT_TYPES,
  ep as LegacyBoardColumn,
  B3 as LegacyBoardHeader,
  P3 as LegacyConfigRow,
  O3 as LegacyItemDrawer,
  Gb as LegacyOverCapNote,
  q3 as LegacyPreviewRail,
  Pr as LegacyWorkCard,
  Hx as LinkList,
  Pe as LiveIndicator,
  C3 as LoadFailed,
  x3 as Loading,
  ho as MCP_SERVER_COLUMNS,
  Dn as Mark,
  r4 as MarkUpload,
  Ke as Marker,
  l4 as McpServerRow,
  o4 as McpServerRowHead,
  vr as Menu,
  wr as MenuButton,
  K3 as NewStreamModal,
  yf as OverCapNote,
  In as OverflowRow,
  ut as Overlay,
  XL as OwedCard,
  F3 as PARTIAL_STEP_REASON,
  mo as POLICY_CHIP_WIDTH,
  _3 as PageFrame,
  o3 as PageHeader,
  Jn as PageIntro,
  c3 as PeriodPicker,
  Rw as PlainList,
  i4 as PolicyRow,
  O4 as PostRow,
  I3 as PreviewRail,
  P4 as ProjectCard,
  F4 as ProjectPage,
  xn as Prose,
  L4 as ProseHeading,
  hn as ROLE_MATRIX_COLUMNS,
  Qr as RULE_ACTIONS,
  Rr as Radio,
  $4 as ReadyChecklist,
  v3 as RecordSection,
  v4 as RequeueSheet,
  b4 as ResolveBlock,
  C4 as ResolvedFieldRow,
  s4 as RoleMatrixRow,
  S4 as RoutingTable,
  U3 as RuleRow,
  c4 as RunbookSteps,
  Yo as STREAM_STEPS,
  E4 as Section,
  p3 as SectionBand,
  ga as SectionHeader,
  $r as SegmentedControl,
  ur as Select,
  R4 as SessionRow,
  n3 as Sidebar,
  YL as SidebarFoldButton,
  A4 as SiteFooter,
  M4 as SiteHeader,
  sT as SplitLayout,
  G3 as StageColumn,
  y3 as StageGrid,
  p4 as StageHistory,
  cN as StageListEditor,
  ZL as StageSteps,
  S3 as StaleStrip,
  tn as StatStrip,
  m3 as StatTiles,
  r3 as StreamAvatar,
  V3 as StreamRow,
  GL as StudioIcon,
  f3 as SubjectRail,
  Xe as Switch,
  t3 as TabLinks,
  u3 as TableHead,
  e3 as Tabs,
  yo as Tag,
  D4 as TextList,
  IL as ThemeProvider,
  Y3 as ToolRow,
  w3 as TopBar,
  L_ as Tree,
  Ar as TreeRow,
  x4 as TypedInputBlock,
  Hi as UNSAFE_HREF,
  d4 as ValidationList,
  AL as VisibilityProvider,
  EL as Visible,
  qL as WARD_VERSION,
  an as WorkCard,
  R3 as WriteUnavailableStrip,
  JR as agoSince,
  Bo as clock,
  xN as colourStatus,
  ne as count,
  se as duration,
  Ln as elapsed,
  PL as eventSourceTransport,
  So as formatDate,
  $t as headingTag,
  Xt as isStreamStep,
  yt as isValidatedStreamStep,
  ig as ladderValidation,
  V0 as mcpConnectionChip,
  U0 as mcpToolName,
  oe as money,
  ye as ms,
  Er as ordered,
  Ua as ratio,
  j4 as readTime,
  w$ as restartLabel,
  T as safeHref,
  xx as slug,
  me as stamp,
  Mn as stream,
  zL as streamChip,
  Bn as streamChipProps,
  ke as streamColour,
  Zo as streamHex,
  zt as streamInitials,
  Qo as streamVars,
  a3 as uniqueStreamInitials,
  ir as useAnchoredPanel,
  Pt as useBorderFlash,
  qe as useDisabledScope,
  Uo as useFocusTrap,
  jL as useLiveFeed,
  BL as useReturnFocus,
  Qt as useRovingTabindex,
  An as useTicker,
  Po as useVisible,
  q as v,
  a4 as validateMark,
  en as validatedStep,
  Va as validatedStreamSteps,
  mL as wordCount
};
