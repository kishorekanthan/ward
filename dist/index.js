import { jsx as t, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Oa, useContext as pe, createContext as $e, useState as v, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as sn, useId as y, Fragment as qa, isValidElement as xo, Children as Ha } from "react";
import { createPortal as To, flushSync as Fa } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const n = Math.floor(e / 6e4);
  if (n < 60) return `${n}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${n % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Yt = (e) => String(e).padStart(2, "0");
function xt(e) {
  const n = Math.floor(Math.max(0, e) / 1e3);
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${Yt(n % 60)}s` : `${Math.floor(a / 60)}h ${Yt(a % 60)}m`;
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
  const n = Lo.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = n.find((l) => l.type === r)) == null ? void 0 : o.value) ?? "";
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
function te(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function za(e, n) {
  return `${e} / ${n}`;
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
const Wa = $e(/* @__PURE__ */ new Set());
function fL({ hidden: e, children: n }) {
  const a = Oa(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Wa.Provider, { value: a, children: n });
}
function Io(e) {
  return !pe(Wa).has(e);
}
function vL({ id: e, children: n, fallback: a = null }) {
  return /* @__PURE__ */ t(x, { children: Io(e) ? n : a });
}
const Eo = "(prefers-color-scheme: dark)";
function Xt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Eo) : null;
}
function Bo(e) {
  const [n, a] = v(() => {
    var r;
    return ((r = Xt()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Xt() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), n;
}
function rt(e, n) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, n), () => a.removeAttribute(e);
  }, [e, n]);
}
function Po(e, n) {
  return e !== "system" ? e : n ? "dark" : "light";
}
function bL({ theme: e, accent: n = "green", density: a = "comfortable", children: r }) {
  const o = Bo(e === "system");
  return rt("data-theme", Po(e, o)), rt("data-accent", n), rt("data-density", a), /* @__PURE__ */ t(x, { children: r });
}
const jo = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Do(e, n) {
  return document.activeElement === n || document.activeElement === e;
}
function Oo(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function qo(e, n, a, r) {
  return e.shiftKey ? Do(n, a) ? r : void 0 : document.activeElement === r || Oo(n) ? a : void 0;
}
function Ho(e, n, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const l = qo(e, n, r, o);
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
function pL(e, n = !0) {
  S(() => {
    if (!n) return;
    const a = document.activeElement;
    return () => {
      var o, l;
      (l = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || l.call(o);
    };
  }, [n, e]);
}
const Qt = { ArrowUp: -1, ArrowDown: 1 }, Zt = { ArrowLeft: -1, ArrowRight: 1 }, zo = (e, n, a) => Math.min(a, Math.max(n, e));
function Wo(e, n) {
  if (n !== "horizontal" && e in Qt) return Qt[e];
  if (n !== "vertical" && e in Zt) return Zt[e];
}
function Jn({ orientation: e = "both" } = {}) {
  const [n, a] = v(0), r = f(/* @__PURE__ */ new Map()), o = f(!1);
  sn(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(n)) return;
    const h = u[0], w = o.current;
    o.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const l = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(n)), _ = Wo(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[zo(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [n, s, e]
  ), d = Z(
    (u) => ({
      tabIndex: u === n ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === n && (o.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [n]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: l };
}
const gL = (e, n, a) => {
  const r = new EventSource(e), o = (l) => a.onEvent(l.data, l.lastEventId, l.type);
  r.onmessage = o;
  for (const l of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(l, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, yL = "0.2.0", NL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ko = [1, 2, 3, 4, 5, 6], Ka = [1, 2, 3], Go = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], kL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], $L = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], P = {
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
function Tt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Yn(e) {
  return Ko.includes(e);
}
function yn(e) {
  return Ka.includes(e);
}
function Uo(e) {
  if (!Yn(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function CL(e) {
  if (!Yn(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Vo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Jo(e) {
  if (!Yn(e)) throw new Error("unvalidated stream step");
  return Vo[e];
}
function ea(e) {
  return typeof e != "string" ? null : Go.includes(e) ? e : null;
}
function Yo(e) {
  try {
    const n = JSON.parse(e);
    return typeof n == "object" && n !== null ? n : null;
  } catch {
    return null;
  }
}
function Xo(e, n) {
  return n !== "" ? n : typeof e.id == "string" ? e.id : "";
}
function Qo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Zo(e, n, a) {
  const r = Yo(e);
  if (r === null) return null;
  const o = ea(a) ?? ea(r.type);
  return o === null ? null : { ...r, type: o, id: Xo(r, n), at: Qo(r) };
}
function el(e, n) {
  return e >= ye.staleAfter ? "stale" : e >= ye.heartbeat && n === "live" ? "reconnecting" : null;
}
function nl(e, n, a) {
  return e >= ye.heartbeat && !n && a !== null;
}
function SL(e, n) {
  const [a, r] = v("reconnecting"), [o, l] = v(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), A = Z((M) => {
    k.current = M, r(M);
  }, []), D = Z(() => {
    c.current = Date.now();
  }, []), we = Z((M) => {
    for (const [V, Se] of s.current)
      (Se === "*" || M.itemKey === Se) && V(M);
  }, []), ae = Z(() => {
    h.current = n(e, { lastEventId: d.current }, {
      onEvent: (M, V, Se) => {
        const Ge = Zo(M, V, Se);
        Ge !== null && (Ge.id && (d.current = Ge.id), D(), N.current = !1, A("live"), l(Ge.at), we(Ge));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, D(), A("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && A("reconnecting");
        const M = Math.min(ye.reconnectBase * 2 ** u.current, ye.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ae, M);
      }
    });
  }, [we, A, D, n, e]), Ce = Z((M) => {
    N.current = !0, M.close(), h.current = null, w.current = window.setTimeout(ae, ye.reconnectBase);
  }, [ae]), Qe = Z((M, V) => (s.current.set(V, M), () => {
    s.current.delete(V);
  }), []);
  return S(() => (ae(), _.current = window.setInterval(() => {
    const M = Date.now() - c.current, V = el(M, k.current);
    V && A(V);
    const Se = h.current;
    nl(M, N.current, Se) && Ce(Se);
  }, ye.tick), () => {
    var M;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (M = h.current) == null || M.close(), h.current = null;
  }), [ae, Ce, A]), { connection: a, lastEventAt: o, subscribe: Qe };
}
function Lt(e, n) {
  const a = new Date(e).getTime(), [r, o] = v(() => Date.now());
  return S(() => {
    if (!n) return;
    const l = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    l();
    const s = window.setInterval(l, ye.tick);
    return document.addEventListener("visibilitychange", l), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", l);
    };
  }, [n, a]), Math.max(0, r - a);
}
const tl = { blue: "running", orange: "waiting", green: "done" };
function al() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function na(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function En(e, n) {
  const a = f(0), r = Z((o) => {
    const l = o ?? n, s = e.current;
    s !== null && l !== void 0 && (al() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${tl[l]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => na(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => na(s), ye.flash)));
  }, [n, e]);
  return S(() => () => window.clearTimeout(a.current), []), n === void 0 ? (o) => r(o) : () => r(n);
}
const rl = "_root_1otpc_2", ol = {
  root: rl
};
function ll(e, n, a, r, o) {
  const l = [xt(n)];
  return e || l.push(`as of ${Mo(a)}`), r && l.push(`turn ${r[0]}/${r[1]}`), o && l.push(o.label), l;
}
function Pe({ startedAt: e, lastEvent: n, connection: a, turn: r }) {
  const o = a !== "stale", l = Lt(e, o), s = (n == null ? void 0 : n.at) ?? e, c = ll(o, l, s, r, n);
  return /* @__PURE__ */ i("span", { className: `${ol.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const il = "_app_1bnco_1", sl = "_side_1bnco_35", cl = "_sideTop_1bnco_46", dl = "_sideBody_1bnco_60", ul = "_iconRail_1bnco_99", hl = "_railItem_1bnco_108", ml = "_railIcon_1bnco_129", wl = "_railDot_1bnco_134", _l = "_railLetter_1bnco_140", fl = "_main_1bnco_146", vl = "_rail_1bnco_108", bl = "_page_1bnco_168", pl = "_headerRow_1bnco_191", gl = "_sidebarToggle_1bnco_198", yl = "_headerSlot_1bnco_203", Nl = "_headerAction_1bnco_208", kl = "_drawerSide_1bnco_213", $l = "_root_1bnco_260", Cl = "_topbar_1bnco_267", Sl = "_mark_1bnco_278", Rl = "_brand_1bnco_285", xl = "_tagline_1bnco_291", Tl = "_identity_1bnco_297", Ll = "_tools_1bnco_298", Al = "_nav_1bnco_308", Ml = "_metadata_1bnco_315", Il = "_actor_1bnco_330", El = "_detail_1bnco_331", Bl = "_content_1bnco_376", Pl = "_toolsPanel_1bnco_392", jl = "_skip_1bnco_418", C = {
  app: il,
  side: sl,
  sideTop: cl,
  sideBody: dl,
  iconRail: ul,
  railItem: hl,
  railIcon: ml,
  railDot: wl,
  railLetter: _l,
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
function un(...e) {
  const n = e.filter((a) => a !== void 0 && a !== "");
  return n.length === 0 ? void 0 : n.join(" ");
}
const Dl = "_scope_1an6i_2", Ol = {
  scope: Dl
}, Ga = $e(null);
function RL({ reason: e, actions: n = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Ol.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(Ga.Provider, { value: { reason: e, reasonId: r, actions: n }, children: a })
  ] });
}
function je() {
  return pe(Ga);
}
function Xn(e, n) {
  return !n || (e ?? "").split(" ").includes(n.reasonId) ? e : un(e, n.reasonId);
}
const ql = "_btn_hrmlj_2", Hl = "_primary_hrmlj_14", Fl = "_destructive_hrmlj_25", zl = "_secondary_hrmlj_35", Wl = "_ghost_hrmlj_40", Kl = "_overflow_hrmlj_49", Gl = "_sm_hrmlj_56", Ul = "_disabled_hrmlj_60", Vl = "_withReason_hrmlj_68", Jl = "_reason_hrmlj_74", rn = {
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
function Yl(e, n, a, r) {
  const o = n === "sm" ? [rn.sm, "ward-btn--sm"] : [], l = a ? [rn.disabled] : [];
  return [rn.btn, rn[e], "ward-btn", `ward-btn--${e}`, ...o, ...l, r ?? ""].filter(Boolean).join(" ");
}
function Xl(e, n) {
  return e !== "overflow" ? {} : n ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Ql(e, n) {
  if (e.disabled && !n && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Zl(e, n) {
  return n ? n.reason : e.disabled ? e.disabledReason : void 0;
}
function ei(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function ni(e, n, a) {
  return ei(e.describedBy, n && a);
}
function ti({ id: e, reason: n, shown: a }) {
  return n ? /* @__PURE__ */ t("span", { id: e, className: a ? `${rn.reason} ward-btn-reason` : "ward-visually-hidden", children: n }) : null;
}
function ai(e) {
  return e.children ?? e.label;
}
function b(e) {
  var n;
  return ((n = je()) == null ? void 0 : n.actions) === "hide" ? null : /* @__PURE__ */ t(ri, { ...e });
}
function ri(e) {
  const n = je();
  Ql(e, n);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || n), l = Zl(e, n), s = y(), c = oi(l, n);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Yl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: l,
        "aria-describedby": ni(e, l, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Xl(a, e.controls),
        children: ai(e)
      }
    ),
    /* @__PURE__ */ t(ti, { id: s, reason: l, shown: c === Ua })
  ] });
}
function oi(e, n) {
  return e && !n ? Ua : qa;
}
function Ua({ children: e }) {
  return /* @__PURE__ */ t("span", { className: `${rn.withReason} ward-btn-withReason`, children: e });
}
let At = "none";
function li(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (At = "key");
}
typeof document < "u" && (document.addEventListener("keydown", li, !0), document.addEventListener("pointerdown", () => {
  At = "pointer";
}, !0));
function ii() {
  return At === "key";
}
function pn(e) {
  const [n, a] = v(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var l;
    const r = (l = window.matchMedia) == null ? void 0 : l.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), n;
}
const si = "_scrim_1cawq_2", ci = "_drawer_1cawq_10", di = "_sheet_1cawq_14", ui = "_modal_1cawq_18", hi = "_panel_1cawq_23", mi = "_start_1cawq_44", wi = "_header_1cawq_67", _i = "_title_1cawq_75", fi = "_body_1cawq_79", vi = "_close_1cawq_106", Me = {
  scrim: si,
  drawer: ci,
  sheet: di,
  modal: ui,
  panel: hi,
  start: mi,
  header: wi,
  title: _i,
  body: fi,
  close: vi
}, bi = $e(null), Dn = [], On = /* @__PURE__ */ new Map();
function pi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function gi(e, n) {
  let a = On.get(n);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: n.hasAttribute("inert") }, On.set(n, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(n), n.setAttribute("inert", ""));
}
function yi(e, n, a) {
  for (const r of Array.from(n.children))
    r !== a && !pi(r) && gi(e, r);
}
function Ni(e, n) {
  let a = null, r = n;
  for (; r; ) {
    if (yi(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function ki(e) {
  for (const n of e.claims) {
    const a = On.get(n);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || n.removeAttribute("inert"), On.delete(n)));
  }
}
function $i(e, n) {
  const a = { root: e, claims: [] };
  return Dn.push(a), Ni(a, n), a;
}
function Ci(e) {
  const n = Dn.indexOf(e);
  n >= 0 && Dn.splice(n, 1), ki(e);
}
function ta(e) {
  return e !== null && Dn.at(-1) === e;
}
function Si(e, n, a) {
  const r = f(null), o = f(a);
  return o.current = a, S(() => {
    const l = e.current;
    if (!l) return;
    const s = document.activeElement, c = $i(l, n);
    return r.current = c, () => {
      var u, h;
      const d = ta(c);
      Ci(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [n]), Z(() => ta(r.current), []);
}
function Ri(e, n) {
  return e === "modal" && !n ? "sheet" : e;
}
function xi(e, n) {
  return e.title !== void 0 ? { labelledBy: n, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ti({ props: e, titleId: n }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Me.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("header", { className: `${Me.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Me.title} ward-drawer-title ward-truncate`, id: n, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Me.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Li(e) {
  return `${Me.scrim} ${Me[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ai(e, n) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = n ? " ward-overlay-panel--wide" : "";
  return `${Me.panel} ${Me[e]} ward-overlay-panel${a}${r}`;
}
function Mi(e) {
  const n = pe(bi);
  return e ?? n ?? document.body;
}
function hn(e) {
  const n = f(null), a = f(null), r = y(), o = Mi(e.container), l = pn("(min-width: 768px)"), s = Ri(e.kind, l), c = xi(e, r), d = Fo(a), [u] = v(ii), h = Si(n, o, e.returnFocusTo), w = Z(() => {
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
  }, [w]), To(
    /* @__PURE__ */ t(
      "div",
      {
        ref: n,
        className: Li(s),
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
            className: Ai(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Me.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(Ti, { props: e, titleId: r })
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
  const n = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < n.length && n.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Ii.exec(n.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function T(e) {
  const n = Pi(e);
  return n === void 0 || Ei.has(n) ? e : Bi;
}
function ji(e) {
  const n = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: n > 1 };
}
function Va(e) {
  const n = ji(e);
  return e.toggleAttribute("data-fade-start", n.start), e.toggleAttribute("data-fade-end", n.end), n;
}
function Di(e, n) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Va(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const l of [a, ...a.children]) o == null || o.observe(l);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, n]);
}
function Oi(e, n) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = n.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + n.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function qi(e, n, a) {
  sn(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[n];
    if (!r || !o) return;
    const l = Oi(r, o);
    l !== null && (r.scrollLeft = Math.max(0, l)), Va(r);
  }, [e, n, a]);
}
const Hi = "_row_11g8i_2", Fi = {
  row: Hi
};
function zi(e, n) {
  return e ? { role: n === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Mt({ label: e, children: n, count: a, as: r = "div", focusable: o = !0, rowRef: l, className: s, ...c }) {
  const d = f(null), u = l ?? d;
  return Di(u, a), /* @__PURE__ */ t(r, { ref: u, className: [Fi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...zi(o, r), ...c, children: n });
}
const Wi = "_icon_1ylqy_2", Ki = {
  icon: Wi
};
function Nn({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Ki.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function xL() {
  return /* @__PURE__ */ t(Nn, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function TL() {
  return /* @__PURE__ */ i(Nn, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function LL() {
  return /* @__PURE__ */ i(Nn, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function AL() {
  return /* @__PURE__ */ t(Nn, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Gi() {
  return /* @__PURE__ */ i(Nn, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const Ja = "ward:sidebar-collapsed", Ui = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Vi() {
  try {
    return window.localStorage.getItem(Ja) === "true";
  } catch {
    return !1;
  }
}
function Ji(e) {
  try {
    window.localStorage.setItem(Ja, String(e));
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
  const [n, a] = v(Vi), r = () => {
    Ji(!n), a(!n);
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
  }, [e, n]), { collapsed: n, toggle: r };
}
function es() {
  const e = pn("(max-width: 767.98px)"), n = pn("(max-width: 1023.98px)");
  return e ? "phone" : n ? "medium" : "wide";
}
function ns(e) {
  const n = e === "phone", a = y(), r = f(null), [o, l] = v(!1);
  return o && !n && l(!1), { narrow: n, open: o, drawerId: a, slotRef: r, toggle: () => l(!o), close: () => l(!1) };
}
function ts({ header: e, action: n, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: C.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: C.headerSlot, children: e }),
    Za(n) && /* @__PURE__ */ t("span", { className: C.headerAction, children: n })
  ] }) : e;
}
function as(e, n) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", n), window.addEventListener("popstate", n), () => {
        window.removeEventListener("hashchange", n), window.removeEventListener("popstate", n);
      };
  }, [e, n]);
}
function rs({ sidebar: e, label: n, drawer: a }) {
  var o;
  if (as(a.open, a.close), !a.open) return null;
  const r = (l) => {
    l.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ t(hn, { kind: "start", id: a.drawerId, title: n, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ t("div", { className: C.drawerSide, onClick: r, children: Ya(e, !1) }) });
}
function os(e) {
  const [n, a] = v(!1);
  return n && e !== "medium" && a(!1), { open: n, toggle: () => a(!n) };
}
function ls(e, n) {
  const a = Zi(e === "wide" && !n), r = os(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function is(e, n) {
  const a = ls(n, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return cs(e.collapsed, n);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: n !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const ss = (e) => e.collapsed && e.drawsStrip;
function cs(e, n) {
  return { enabled: !1, collapsed: n === "medium" || e && n === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const aa = (e) => e ? "" : void 0;
function Ya(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Xa({ fold: e }) {
  return /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Gi, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function ds({ fold: e, inSidebar: n }) {
  return !e.enabled || n ? null : /* @__PURE__ */ t("div", { className: C.sideTop, children: /* @__PURE__ */ t(Xa, { fold: e }) });
}
const Qa = $e(null);
function ML() {
  const e = pe(Qa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ t(Xa, { fold: e });
}
function us({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": Tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function hs({ items: e, label: n }) {
  return /* @__PURE__ */ t("nav", { className: C.iconRail, "aria-label": n, children: e.map((a) => /* @__PURE__ */ i("a", { className: C.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(us, { item: a }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function ms({ sidebar: e, label: n, iconRail: a, fold: r, inSidebar: o }) {
  const l = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(ds, { fold: r, inSidebar: o && !l }),
    /* @__PURE__ */ t("div", { className: C.sideBody, hidden: l, children: Ya(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(hs, { items: a ?? [], label: n })
  ] });
}
const Za = (e) => e != null;
function ws(e) {
  const { sidebar: n, header: a, action: r, children: o, rail: l, iconRail: s, pageFill: c } = e, d = Za(l), u = es(), h = ns(u), w = is(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": aa(ss(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ t(Qa.Provider, { value: w, children: /* @__PURE__ */ t(ms, { sidebar: n, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ t(ts, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ t("div", { className: C.page, "data-fill": aa(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ t("div", { className: C.rail, children: l }),
    /* @__PURE__ */ t(rs, { sidebar: n, label: _, drawer: h })
  ] });
}
function _s({ destinations: e, active: n }) {
  const a = f(null);
  return qi(a, e.findIndex((r) => r.id === n), "a"), /* @__PURE__ */ t(Mt, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: T(r.href), "aria-current": r.id === n ? "page" : void 0, children: r.label }, r.id)) });
}
function vt({ value: e, className: n }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: n, children: e });
}
function fs({ actor: e, metadata: n }) {
  return e === void 0 && n === void 0 ? null : /* @__PURE__ */ i("span", { className: C.metadata, children: [
    /* @__PURE__ */ t(vt, { value: e, className: C.actor }),
    e !== void 0 && n !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(vt, { value: n, className: C.detail })
  ] });
}
function vs() {
  const e = pn("(max-width: 767.98px)"), n = y(), a = f(null), [r, o] = v(!1);
  return { narrow: e, open: r, panelId: n, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function bs({ tools: e, toolsLabel: n, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ t("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: n ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: C.tools, children: e });
}
function ps({ tools: e, menu: n }) {
  if (e === void 0 || !n.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && n.close();
  };
  return /* @__PURE__ */ t("div", { id: n.panelId, className: C.toolsPanel, hidden: !n.open, onKeyDown: a, children: e });
}
function gs(e) {
  return /* @__PURE__ */ i("header", { className: C.topbar, children: [
    /* @__PURE__ */ t("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(vt, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ t(_s, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: C.identity, children: /* @__PURE__ */ t(fs, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(bs, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ys(e) {
  const n = y(), a = vs();
  return /* @__PURE__ */ i("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: C.skip, href: `#${n}`, children: "Skip to content" }),
    /* @__PURE__ */ t(gs, { ...e, menu: a }),
    /* @__PURE__ */ t(ps, { tools: e.tools, menu: a }),
    /* @__PURE__ */ t("div", { id: n, className: C.content, children: e.children })
  ] });
}
function Ns(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function IL(e) {
  return Ns(e) ? /* @__PURE__ */ t(ws, { ...e }) : /* @__PURE__ */ t(ys, { ...e });
}
const ks = "_root_itg9o_2", $s = "_row_itg9o_8", Cs = "_box_itg9o_14", Ss = "_label_itg9o_21", Rs = "_labelHidden_itg9o_26", xs = "_consequence_itg9o_44", Ts = "_sample_itg9o_79", Ve = {
  root: ks,
  row: $s,
  box: Cs,
  label: Ss,
  labelHidden: Rs,
  consequence: xs,
  sample: Ts
};
function Ls(e, n) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || n) };
}
function As({ id: e, text: n }) {
  return n ? /* @__PURE__ */ t("p", { id: e, className: `${Ve.consequence} ward-check-consequence`, children: n }) : null;
}
function Ms(e, n, a) {
  return n && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Is(e, n, a, r) {
  const o = e.consequence ? `${n}-note` : void 0, l = Ms(e, a, r), s = l ? `${n}-reason` : void 0, c = Xn(un(o, e.describedBy, s), r);
  return { noteId: o, reason: l, reasonId: `${n}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? l } };
}
function Es({ id: e, reason: n }) {
  return n ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: n }) : null;
}
function Bs({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Ve.sample, "aria-hidden": "true", children: e }) : null;
}
function er(e) {
  const n = y(), a = je(), r = Ls(e, a), o = Is(e, n, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Ve.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Ve.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: n,
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
      /* @__PURE__ */ t("label", { htmlFor: n, className: e.labelHidden ? Ve.labelHidden : Ve.label, children: e.label }),
      /* @__PURE__ */ t(Bs, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(Es, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ t(As, { id: o.noteId, text: e.consequence })
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
function Os(e, n) {
  if (e === "stream") return qs(n);
  if (n) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Ds[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function qs(e) {
  if (!e || !yn(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const n = Tt(e);
  return { "--ward-chip-bg": n.chip, "--ward-chip-fg": n.chipText, "--ward-chip-line": n.chip };
}
function m({ role: e, label: n, streamStep: a, size: r }) {
  if (!n) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${js.chip} ward-chip ward-chip--${e}`, style: Os(e, a), "data-ward-chip": e, "data-size": r, children: n });
}
const Hs = "_clamp_zn74g_3", ra = {
  clamp: Hs
};
function cn({ text: e, as: n = "span", className: a }) {
  return /* @__PURE__ */ t(n, { className: a === void 0 ? ra.clamp : `${ra.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Fs = "_root_1btz3_2", zs = "_body_1btz3_10", Ws = "_toggle_1btz3_24", ot = {
  root: Fs,
  body: zs,
  toggle: Ws
};
function EL({ children: e, lines: n = 3, label: a }) {
  const [r, o] = v(!1), l = y();
  return /* @__PURE__ */ i("div", { className: ot.root, children: [
    /* @__PURE__ */ t("div", { id: l, className: ot.body, "data-lines": n, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ t("button", { type: "button", className: ot.toggle, "aria-expanded": r, "aria-controls": l, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Ks = "_root_1a4s8_2", Gs = "_words_1a4s8_16", Us = "_title_1a4s8_23", Vs = "_actions_1a4s8_27", Cn = {
  root: Ks,
  words: Gs,
  title: Us,
  actions: Vs
};
function BL({ title: e, sentence: n, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: Cn.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: Cn.words, children: [
      /* @__PURE__ */ t("strong", { className: Cn.title, children: e }),
      /* @__PURE__ */ t("span", { children: n })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Cn.actions, children: a })
  ] });
}
const Js = "_root_8zmpu_2", Ys = "_step_8zmpu_12", Xs = "_dot_8zmpu_38", Qs = "_label_8zmpu_51", _n = {
  root: Js,
  step: Ys,
  dot: Xs,
  label: Qs
}, Zs = { done: ", done", now: ", current", next: "" };
function ec({ step: e, running: n }) {
  const a = e.state === "now" && n;
  return /* @__PURE__ */ i("li", { className: _n.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: a ? `${_n.dot} ward-running` : _n.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: _n.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: Zs[e.state] })
  ] });
}
function PL({ steps: e, running: n = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ t("ol", { className: _n.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ t(ec, { step: r, running: n }, r.label)) });
}
function Qn(e) {
  return typeof e == "number" && yn(e) ? e : null;
}
function ke(e, n) {
  const a = Qn(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${n})`;
}
function It(e, n) {
  const a = Qn(n);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const nc = "_root_13eei_3", tc = "_nav_13eei_8", ac = "_list_13eei_16", rc = "_item_13eei_24", oc = "_link_13eei_44", lc = "_sep_13eei_54", ic = "_current_13eei_58", sc = "_chips_13eei_62", Oe = {
  root: nc,
  nav: tc,
  list: ac,
  item: rc,
  link: oc,
  sep: lc,
  current: ic,
  chips: sc
};
function cc({ step: e, isCurrent: n }) {
  return n ? /* @__PURE__ */ t("span", { className: Oe.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { className: `${Oe.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ t("span", { title: e.label, children: e.label });
}
function dc({ path: e, chips: n, current: a = !0 }) {
  return /* @__PURE__ */ t("div", { className: Oe.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: Oe.nav, children: [
    /* @__PURE__ */ t("ol", { className: Oe.list, children: e.map((r, o) => /* @__PURE__ */ i("li", { className: Oe.item, children: [
      o > 0 ? /* @__PURE__ */ t("span", { className: Oe.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ t(cc, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    n != null && n.length ? /* @__PURE__ */ t("span", { className: `${Oe.chips} ward-chiprow`, children: n.map((r) => /* @__PURE__ */ t(m, { ...r }, r.label)) }) : null
  ] }) });
}
function nr(e, n, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (l) => {
      var s;
      (s = n.current) != null && s.contains(l.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, n]);
}
const uc = 500;
function tr(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function ar() {
  const e = f(""), n = f(void 0);
  return S(() => () => clearTimeout(n.current), []), (a) => (clearTimeout(n.current), e.current += a.toLowerCase(), n.current = setTimeout(() => {
    e.current = "";
  }, uc), e.current);
}
const Sn = 4;
function hc(e, n, a) {
  const r = Math.max(0, a - e.bottom - Sn * 2), o = Math.max(0, e.top - Sn * 2);
  return n <= r || r >= o ? { top: e.bottom + Sn, maxHeight: r } : { top: e.top - Sn - Math.min(n, o), maxHeight: o };
}
function mc(e, n, a, r) {
  const o = { start: e.left, end: e.right - n }, l = { start: o.start + n <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = l[r] || !l[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - n));
}
function wc(e, n, a, r) {
  return { ...hc(e, n.height, a.height), left: mc(e, n.width, a.width, r) };
}
function Bn(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function _c(e, n) {
  const a = e.getBoundingClientRect(), r = n ? n.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function fc(e, n, a) {
  const r = _c(n, a);
  e.style.setProperty("--ward-anchor-width", Bn(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: r, box: o, view: { width: l.clientWidth, height: l.clientHeight } };
}
function vc(e) {
  const n = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = n.map((r) => r.scrollTop);
  return () => n.forEach((r, o) => r.scrollTop = a[o]);
}
function oa(e, n, a, r) {
  const o = vc(e), l = fc(e, n, r), s = wc(l.edges, l.box, l.view, a);
  Object.assign(e.style, { left: Bn(s.left - l.box.left), top: Bn(s.top - l.box.top), maxHeight: Bn(s.maxHeight) }), o();
}
function bc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function rr(e, n, a = "start", r) {
  sn(() => {
    const o = n.current, l = e.current;
    if (!o || !l) return;
    const s = bc(o), c = () => oa(o, l, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, n, a, r]), sn(() => {
    n.current && e.current && oa(n.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const pc = "_root_1lgbn_2", gc = "_trigger_1lgbn_7", yc = "_value_1lgbn_47", Nc = "_menu_1lgbn_65", kc = "_find_1lgbn_87", $c = "_list_1lgbn_103", Cc = "_option_1lgbn_114", Sc = "_check_1lgbn_133", Rc = "_empty_1lgbn_144", Ne = {
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
function Tc(e, n) {
  const a = n.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function la(e, n) {
  return Math.max(0, e.findIndex((a) => a.value === n));
}
function Lc(e, n) {
  const [a, r] = v(e.defaultOpen === !0), [o, l] = v(""), [s, c] = v(() => la(e.options, e.value)), d = (u) => {
    var h;
    Fa(() => r(!1)), u && ((h = n.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Tc(e.options, o),
    findable: e.options.length > xc,
    show: () => {
      e.disabled || (l(""), c(la(e.options, e.value)), r(!0));
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
function Ac(e, n) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = n.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Mc(e) {
  const n = ar();
  return (a) => {
    const r = n(a), o = e.entries.findIndex((l) => l.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function or(e) {
  const n = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, n)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Ic(e) {
  return { ...or(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function lr(e, n, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = n[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Ec = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Bc(e, n) {
  const a = () => {
    n(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Ec.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Pc({ entry: e, at: n, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": n === a.active || void 0,
      className: Ne.option,
      onMouseDown: (l) => l.preventDefault(),
      onMouseMove: () => a.to(n),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: Ne.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: Ne.label, children: e.option.label })
      ]
    }
  );
}
function Et(e, n) {
  const a = e.entries[e.active];
  return a ? n.option(a.index) : void 0;
}
function jc({ menu: e, ids: n, focusRef: a }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: a,
      className: Ne.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": n.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Et(e, n),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: lr(e, or(e), () => {
      })
    }
  );
}
function Dc({ props: e, menu: n, ids: a, focusRef: r, trigger: o }) {
  const l = Mc(n), s = f(null);
  rr(o, s);
  const c = (d) => {
    tr(d) && l(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: Ne.menu, children: [
    n.findable && /* @__PURE__ */ t(jc, { menu: n, ids: a, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: n.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: Ne.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": n.findable ? void 0 : Et(n, a),
        onKeyDown: lr(n, Ic(n), c),
        children: n.entries.map((d, u) => /* @__PURE__ */ t(Pc, { entry: d, at: u, menu: n, ids: a, value: e.value }, d.index))
      }
    ),
    n.entries.length === 0 && /* @__PURE__ */ t("p", { className: Ne.empty, children: "No match" })
  ] });
}
function Oc(e, n) {
  const a = e.open ? Et(e, n) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function ir(...e) {
  return e.filter(Boolean).join(" ");
}
function qc(e) {
  var n;
  return ((n = e.options.find((a) => a.value === e.value)) == null ? void 0 : n.label) ?? e.placeholder;
}
function Hc({ props: e, menu: n, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const l = !e.options.some((d) => d.value === e.value), s = (c = je()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: ir(Ne.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": n.open,
      "aria-controls": n.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": un(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Bc(n, o),
      children: /* @__PURE__ */ t("span", { id: a.value, className: Ne.value, "data-placeholder": l || void 0, children: qc(e) })
    }
  );
}
function sr(e) {
  const n = je(), a = n ? { ...e, disabled: !0, "aria-describedby": Xn(e["aria-describedby"], n) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, l = f(null), s = f(null), c = f(null), d = Lc(a, s), u = Ac(d.open, c);
  return nr(d.open, l, () => d.close(!1)), Oc(d, o), /* @__PURE__ */ i("div", { ref: l, className: ir(Ne.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Hc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ t("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ t(Dc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const Fc = "_field_1ensj_2", zc = "_label_1ensj_8", Wc = "_labelHidden_1ensj_15", Kc = "_control_1ensj_25", Gc = "_mono_1ensj_45", Uc = "_area_1ensj_50", Vc = "_invalid_1ensj_57", ze = {
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
}, cr = (e) => `${e}-label`;
function Yc({ props: e, controlProps: n, cls: a }) {
  const r = e.secret ? Jc : {};
  return /* @__PURE__ */ t("input", { className: a, ...r, ...n });
}
function Xc({ props: e, controlProps: n, cls: a }) {
  return /* @__PURE__ */ t(
    sr,
    {
      id: n.id,
      triggerClassName: a,
      "aria-labelledby": cr(n.id),
      "aria-invalid": n["aria-invalid"],
      "aria-describedby": n["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: n.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange,
      size: e.variant === "toolbar" ? "md" : void 0
    }
  );
}
function Qc({ props: e, controlProps: n, cls: a }) {
  return /* @__PURE__ */ t("textarea", { className: a, rows: e.rows ?? 3, ...n });
}
function Zc({ props: e, controlProps: n, cls: a }) {
  return /* @__PURE__ */ t("input", { className: a, type: "date", min: e.min, max: e.max, ...n });
}
const ed = { input: Yc, select: Xc, textarea: Qc, date: Zc };
function nd(e, n, a) {
  const r = ed[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: n, cls: a });
}
function td(e, n, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: n,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Xn(un(o ? a : void 0, e.describedBy), r),
    onChange: (l) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, l.target.value);
    }
  };
}
function ad(e) {
  const n = e.mono ? [ze.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [ze.area] : [];
  return [ze.control, "ward-field-input", ...n, ...a].filter(Boolean).join(" ");
}
function rd(e) {
  return e ? `${ze.label} ${ze.labelHidden} ward-field-label` : `${ze.label} ward-field-label`;
}
function E(e) {
  const n = y(), a = `${n}-msg`, r = td(e, n, a, je()), o = ad(e);
  return /* @__PURE__ */ i("div", { className: `${ze.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: cr(n), className: rd(e.labelHidden), htmlFor: n, children: e.label }),
    nd(e, r, o),
    e.invalid && /* @__PURE__ */ t("p", { id: a, className: `${ze.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const od = "_root_sjvm0_2", ld = "_trigger_sjvm0_9", id = "_ghost_sjvm0_27", sd = "_panel_sjvm0_46", cd = "_edged_sjvm0_67", dd = "_menu_sjvm0_73", ud = "_group_sjvm0_78", hd = "_heading_sjvm0_83", md = "_item_sjvm0_89", wd = "_description_sjvm0_105", _d = "_large_sjvm0_109", fd = "_touch_sjvm0_113", vd = "_icon_sjvm0_117", bd = "_label_sjvm0_125", pd = "_text_sjvm0_130", gd = "_trailing_sjvm0_138", yd = "_check_sjvm0_144", Nd = "_separator_sjvm0_183", kd = "_footer_sjvm0_189", $d = "_find_sjvm0_196", Cd = "_findGlyph_sjvm0_208", Sd = "_findInput_sjvm0_214", Rd = "_empty_sjvm0_230", L = {
  root: od,
  trigger: ld,
  ghost: id,
  panel: sd,
  edged: cd,
  menu: dd,
  group: ud,
  heading: hd,
  item: md,
  description: wd,
  large: _d,
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
}, dr = $e(null);
function xd(e, n) {
  const [a, r] = v({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((l) => ({ open: !0, start: o, request: l.request + 1 })),
    close: (o) => {
      var l;
      Fa(() => r((s) => ({ ...s, open: !1 }))), o && ((l = n.current) == null || l.focus());
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
    onKeyDown: (n) => {
      const a = Td.get(n.key);
      a && (n.preventDefault(), e.show(a));
    },
    onKeyUp: (n) => {
      n.key === " " && n.preventDefault();
    }
  };
}
function Bt(...e) {
  return e.filter(Boolean).join(" ");
}
function Ad(e, n = {}, a = "field") {
  const { ref: r, className: o, ...l } = n;
  return { ...l, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Bt(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function ur(e) {
  const n = y(), a = { menuId: `${n}-menu`, buttonId: `${n}-button` }, r = f(null), o = f(null), l = xd(e.defaultOpen === !0, o);
  return nr(l.open, r, () => l.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Bt(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
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
    l.open && /* @__PURE__ */ t(dr.Provider, { value: { ...a, popup: l, button: o }, children: e.children })
  ] });
}
function Md(e) {
  let n = 0;
  const a = (r) => ({ item: r, at: n++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Id(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Ed = (e) => e.flatMap((n) => n === "separator" ? [] : "items" in n ? n.items : [n]).length;
function Bd(e, n) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(n);
  return r.length ? { ...e, items: r } : null;
}
function Pd(e, n) {
  return e === "separator" ? e : "items" in e ? Bd(e, n) : n(e) ? e : null;
}
function jd(e) {
  const n = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; n[0] === "separator"; ) n.shift();
  for (; n[n.length - 1] === "separator"; ) n.pop();
  return n;
}
function Dd(e, n) {
  const a = n.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return jd(e.map((o) => Pd(o, r)).filter((o) => o !== null));
}
const hr = (e, n) => (e % n + n) % n;
function He(e, n, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = hr(n + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Od = (e) => e.split("").every((n) => n === e[0]);
function qd(e, n, a) {
  const r = Od(a), o = r ? a[0] : a, l = r ? n : n - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = hr(l + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Hd(e) {
  const n = f([]);
  return n.current.length = e.length, {
    items: e,
    refs: n,
    current: () => n.current.indexOf(document.activeElement),
    focus: (a) => {
      var r;
      return (r = n.current[a]) == null ? void 0 : r.focus();
    }
  };
}
function Fd(e, n) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(He(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(He(a, e.current(), -1))],
    ["Home", () => e.focus(He(a, -1, 1))],
    ["End", () => e.focus(He(a, a.length, -1))],
    ["Escape", () => n.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function zd(e, n, a) {
  const r = ar(), o = Fd(e, n), l = (s) => {
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
  const n = f(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (n.current = !0);
    },
    onBlur: () => {
      n.current && e.close(!1);
    }
  };
}
function Kd(e) {
  const n = e.findIndex((a) => a.current && !a.disabled);
  return n === -1 ? He(e, -1, 1) : n;
}
function Gd(e, n) {
  const { start: a, request: r } = n, o = f(e);
  o.current = e, S(() => {
    const { items: l, focus: s } = o.current;
    a && s(a === "first" ? Kd(l) : He(l, l.length, -1));
  }, [a, r]);
}
function Ud({ row: e, nav: n, popup: a }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (l) => l.preventDefault(),
    onMouseMove: () => {
      !r.disabled && n.current() !== o && n.focus(o);
    },
    onClick: (l) => {
      var s;
      if (r.disabled) return l.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Vd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Jd(e, n) {
  return Vd(e) ? { "aria-labelledby": n + "-label", "aria-describedby": e.description ? n + "-description" : void 0 } : {};
}
function Yd(e, n) {
  const a = /* @__PURE__ */ t("span", { id: n + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ t("span", { id: n + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function Xd() {
  return /* @__PURE__ */ t("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ia(e, n) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ t("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    Yd(e, n),
    e.trailing ? /* @__PURE__ */ t("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ t(Xd, {}) : null
  ] });
}
function mr(e) {
  const { item: n, at: a } = e.row, r = y(), o = {
    ref: (l) => {
      e.nav.refs.current[a] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": n.current ? "true" : void 0,
    "aria-disabled": n.disabled ? "true" : void 0,
    ...Jd(n, r),
    ...Ud(e)
  };
  return n.href && !n.disabled ? /* @__PURE__ */ t("a", { href: T(n.href), ...o, children: ia(n, r) }) : /* @__PURE__ */ t("button", { type: "button", ...o, children: ia(n, r) });
}
function Qd({ heading: e, rows: n, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ t("div", { id: o, className: L.heading, children: e }),
    n.map((l) => /* @__PURE__ */ t(mr, { row: l, nav: a, popup: r }, l.at))
  ] });
}
function Zd({ block: e, nav: n, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Qd, { heading: e.heading, rows: e.rows, nav: n, popup: a }) : /* @__PURE__ */ t(mr, { row: e.row, nav: n, popup: a });
}
function eu() {
  const e = pe(dr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function nu() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ t("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ t("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function tu(e, n) {
  const a = () => He(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(He(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => n.close(!0)]
  ]);
}
function au({ find: e, query: n, setQuery: a, input: r, nav: o, popup: l, menuId: s }) {
  const c = tu(o, l), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ t(nu, {}),
    /* @__PURE__ */ t("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: n, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function ru(e, n) {
  const [a, r] = v(""), o = f(null), l = n !== void 0 && Ed(e) >= (n.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return l ? { find: n, query: a, setQuery: r, input: o, toFind: s, entries: Dd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const ou = { regular: void 0, large: L.large, touch: L.touch }, lu = (e, n) => Bt(L.panel, e ? L.edged : void 0, ou[n]);
function iu({ find: e, count: n }) {
  return !e || n > 0 ? null : /* @__PURE__ */ t("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function wr({ entries: e, footer: n, align: a = "start", find: r, edges: o, size: l = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = eu(), h = f(null);
  rr(u, h, a, o);
  const w = ru(e, r), _ = Md(w.entries), N = Hd(_.flatMap(Id).map((D) => D.item)), k = zd(N, s, w.toFind), A = Wd(s);
  return Gd(N, s), /* @__PURE__ */ i("div", { ref: h, className: lu(o, l), ...A, children: [
    w.find && /* @__PURE__ */ t(au, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ t("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: _.map((D, we) => /* @__PURE__ */ t(Zd, { block: D, nav: N, popup: s }, we)) }),
    /* @__PURE__ */ t(iu, { find: w.find, count: N.items.length }),
    n && /* @__PURE__ */ t("p", { className: L.footer, children: n })
  ] });
}
function su(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function _r(e, n) {
  S(() => {
    const a = e.current;
    n === "page" && a && !su(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, n]);
}
const cu = (e, n) => e.reduce((a, r) => a + r + n, -n);
function du({ room: e, widths: n, more: a, gap: r }, o) {
  const l = n.map((d, u) => u);
  if (cu(n, r) <= e) return l;
  const s = /* @__PURE__ */ new Set([o]);
  let c = n[o] + r + a;
  for (const d of l)
    if (d !== o) {
      if (c += n[d] + r, c > e) break;
      s.add(d);
    }
  return l.filter((d) => s.has(d));
}
const lt = (e) => Number.parseFloat(e) || 0, sa = (e) => e.getBoundingClientRect().width;
function uu(e, n) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - lt(a.paddingInlineStart) - lt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(n), sa),
    more: r ? sa(r) : 0,
    gap: lt(a.columnGap)
  };
}
function hu(e, n) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(n);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const mu = (e, n) => JSON.stringify(e) === JSON.stringify(n);
function fr(e, n, a, r = ':scope > [role="tab"]') {
  const [o, l] = v(null);
  return sn(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = uu(s, r);
      l((u) => mu(u, d) ? u : d);
    };
    return c(), hu(s, c);
  }, [e, a, r]), o && du(o, n);
}
const wu = "_strip_1eynz_2", _u = "_fits_1eynz_19", fu = "_probe_1eynz_27", vu = "_moreRoot_1eynz_36", bu = "_more_1eynz_36", pu = "_tab_1eynz_55", gu = "_count_1eynz_91", yu = "_badge_1eynz_97", U = {
  strip: wu,
  fits: _u,
  probe: fu,
  moreRoot: vu,
  more: bu,
  tab: pu,
  count: gu,
  badge: yu
}, vr = "More";
function Nu(e, n) {
  const a = e.findIndex((r) => r.id === n);
  return a < 0 ? 0 : a;
}
const ca = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Pt = (e) => e.badge === void 0 ? ca(e) : `${ca(e)}, ${e.badge}`;
function br(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const ku = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function $u({ tab: e, active: n, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${U.tab} ward-tab`,
      "aria-selected": e.id === n,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : Pt(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: U.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ t("span", { className: U.badge, children: e.badge })
      ]
    }
  );
}
function Cu(e, n) {
  return (a) => {
    n(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((l) => l.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Su({ tabs: e, trigger: n, onPick: a }) {
  return /* @__PURE__ */ t(ur, { label: vr, className: U.moreRoot, trigger: { ...n, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ t(wr, { align: "end", entries: e.map((r) => ({ label: Pt(r), onSelect: () => a(r.id) })) }) });
}
function Ru(e, n, a) {
  return !n || n.includes(a) ? e.itemProps(a) : ku;
}
function jL({ tabs: e, active: n, onChange: a, label: r = "Tabs", level: o }) {
  const l = Jn({ orientation: "horizontal" }), s = Nu(e, n);
  S(() => l.setActive(s), [l.setActive, s]);
  const c = f(null);
  _r(c, o);
  const d = fr(c, s, e.map(Pt).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${br(o)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...l.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ t($u, { tab: h, active: n, place: Ru(l, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: vr }),
    u.length > 0 && /* @__PURE__ */ t(Su, { tabs: u, trigger: l.itemProps(e.length), onPick: Cu(c, a) })
  ] });
}
const da = 7, pr = "More", xu = ":scope > a", gr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Tu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Lu(e, n) {
  return !e || e.includes(n) ? {} : Tu;
}
function Au({ link: e, current: n, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": n ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Mu({ links: e }) {
  return /* @__PURE__ */ t(ur, { label: pr, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ t(wr, { align: "end", entries: e.map((n) => ({ label: gr(n), href: n.href })) }) });
}
function DL({ links: e, active: n, label: a, level: r }) {
  if (e.length > da) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${da} — the set is fixed`);
  const o = f(null);
  _r(o, r);
  const l = Math.max(0, e.findIndex((d) => d.id === n)), s = fr(o, l, e.map(gr).join(`
`), xu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: o, className: `${br(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ t(Au, { link: d, current: d.id === n, place: Lu(s, u) }, d.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: pr }),
    c.length > 0 && /* @__PURE__ */ t(Mu, { links: c })
  ] });
}
const Iu = "_root_v56ff_3", Eu = "_segment_v56ff_9", ua = {
  root: Iu,
  segment: Eu
};
function yr({ options: e, value: n, onChange: a, label: r = "Options", disabled: o = !1, describedBy: l }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Jn({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === n));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${ua.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: ua.segment,
      "aria-checked": d.value === n,
      disabled: o,
      "aria-describedby": l,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Bu = "_sidebar_s9o1j_3", Pu = "_brand_s9o1j_9", ju = "_mark_s9o1j_17", Du = "_word_s9o1j_24", Ou = "_nav_s9o1j_30", qu = "_navItem_s9o1j_39", Hu = "_footLink_s9o1j_49", Fu = "_group_s9o1j_58", zu = "_groupName_s9o1j_65", Wu = "_agents_s9o1j_81", Ku = "_agent_s9o1j_81", Gu = "_root_s9o1j_96", Uu = "_agentTop_s9o1j_105", Vu = "_dot_s9o1j_112", Ju = "_agentName_s9o1j_124", Yu = "_agentMeta_s9o1j_138", Xu = "_foot_s9o1j_49", Qu = "_footName_s9o1j_150", Zu = "_footLinks_s9o1j_157", eh = "_linkBrand_s9o1j_184", nh = "_label_s9o1j_205", th = "_note_s9o1j_210", ah = "_footer_s9o1j_226", I = {
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
  label: nh,
  note: th,
  footer: ah
};
function rh({ agent: e }) {
  const n = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: I.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": n ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: I.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: I.dot,
              "data-paused": n ? "true" : void 0,
              style: { "--dot": Tt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function oh({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ t("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: I.footLinks, children: e.links.map((n) => /* @__PURE__ */ t("a", { className: `${I.footLink} ward-target`, href: T(n.href), children: n.label }, n.href)) })
  ] }) : null;
}
function lh({ brand: e, nav: n, agentsHeading: a, agents: r, newAction: o, shared: l }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: I.brand, children: [
      /* @__PURE__ */ t("span", { className: I.mark }),
      /* @__PURE__ */ t("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: I.nav, children: n.map((s) => /* @__PURE__ */ t("a", { className: I.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: I.group, children: [
      /* @__PURE__ */ i("span", { className: I.groupName, children: [
        a,
        " · ",
        te(r.length)
      ] }),
      o && /* @__PURE__ */ t("a", { className: I.new, href: T(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ t(rh, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(oh, { shared: l })
  ] });
}
function ih(e) {
  return e.destinations ?? e.items ?? [];
}
function sh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: I.linkBrand, children: e });
}
function ch({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: I.footer, children: e });
}
function dh({ link: e, active: n }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": n ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: I.note, children: e.note })
  ] });
}
function uh(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(sh, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: ih(e).map((n) => /* @__PURE__ */ t(dh, { link: n, active: n.id === e.active }, n.id)) }),
    /* @__PURE__ */ t(ch, { children: e.children })
  ] });
}
function hh(e) {
  return "agents" in e;
}
function OL(e) {
  return hh(e) ? /* @__PURE__ */ t(lh, { ...e }) : /* @__PURE__ */ t(uh, { ...e });
}
const mh = "_mark_wlgi8_3", wh = {
  mark: mh
}, _h = { met: "✓", unmet: "", failed: "✕" };
function jt({ state: e, label: n }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: wh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0,
      children: _h[e]
    }
  );
}
const fh = "_avatar_1t33a_3", vh = {
  avatar: fh
};
function qn(e) {
  const n = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (n.length > 1 ? (n[0] ?? "").charAt(0) + (n[1] ?? "").charAt(0) : (n[0] ?? "").slice(0, 2)).toUpperCase();
}
function bh(e) {
  const n = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = n.charAt(0);
  return [qn(e), ...[...n.slice(1)].map((r) => a + r)];
}
function ph(e, n) {
  const a = bh(e).find((o) => !n.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; n.has(qn(e).charAt(0) + String(r)); ) r += 1;
  return qn(e).charAt(0) + String(r);
}
function qL(e) {
  const n = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = ph(r, n);
    n.add(o), a.set(r, o);
  }
  return a;
}
function gh(e) {
  return e != null && yn(e) ? Uo(e) : void 0;
}
function HL({ name: e, step: n, size: a = "md", initials: r }) {
  return /* @__PURE__ */ t("span", { className: vh.avatar, "data-size": a, "aria-hidden": "true", style: gh(n), children: r ?? qn(e) });
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
function Ke({ size: e, kind: n, label: a }) {
  const r = { "--marker": kh[n], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Nh.marker} ward-marker ward-marker--${n}${$h[n] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Ch = "_root_ti0pq_2", Sh = "_chip_ti0pq_11", Rh = "_noCase_ti0pq_23", Rn = {
  root: Ch,
  chip: Sh,
  noCase: Rh
};
function xh(e, n) {
  return e ?? n ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Dt({ connection: e, since: n, lastEventAt: a }) {
  const r = xh(n, a), o = Lt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${Rn.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Ke, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${Rn.chip} ward-connection`, role: "status", children: [
    "Reconnecting ·",
    " ",
    /* @__PURE__ */ t("span", { className: Rn.noCase, children: xt(o) })
  ] }) : /* @__PURE__ */ i("span", { className: `${Rn.chip} ward-connection`, role: "status", children: [
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
function Wh({ title: e, density: n }) {
  return n === "record" ? /* @__PURE__ */ t(cn, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ t("h1", { className: G.title, children: e });
}
function Kh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: G.chips, children: e.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null;
}
function Gh({ consequence: e, consequenceHint: n }) {
  return e ? /* @__PURE__ */ t("p", { className: G.consequence, title: n, children: e }) : null;
}
function Uh({ chips: e = [], consequence: n, consequenceHint: a }) {
  return e.length === 0 && !n ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ t(Kh, { chips: e }),
    /* @__PURE__ */ t(Gh, { consequence: n, consequenceHint: a })
  ] });
}
function Vh({ title: e, chips: n, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ t(Wh, { title: e, density: o }),
    /* @__PURE__ */ t(Uh, { chips: n, consequence: a, consequenceHint: r })
  ] });
}
function bt({ actions: e }) {
  return e.map((n, a) => /* @__PURE__ */ t("span", { className: G.action, "data-action": "", children: n }, a));
}
function ha({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Jh({ actions: e, hasMore: n, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(ha, { disclosure: o }) : n ? [/* @__PURE__ */ t(ha, { disclosure: o }, "more"), /* @__PURE__ */ t(bt, { actions: e }, "actions")] : /* @__PURE__ */ t(bt, { actions: e });
}
function Yh(e, n, a, r) {
  return a ? r ? null : [...e, ...n] : e.length > 0 ? e : null;
}
function Xh({ actions: e, disclosure: n, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ t("div", { id: n.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !n.open, onKeyDown: r, children: /* @__PURE__ */ t(bt, { actions: e }) });
}
function Qh(e, n) {
  const a = y(), [r, o] = v(!1), l = r && e;
  return { disclosure: { open: l, panelId: a, toggle: () => o(!l) }, close: () => {
    var d, u;
    o(!1), (u = (d = n.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Zh = (e, n) => e.trim().toLowerCase() === n.trim().toLowerCase();
function em(e = [], n, a) {
  const r = e.at(-1);
  return r !== void 0 && Zh(r.label, n) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function nm({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ t("div", { className: G.context, children: /* @__PURE__ */ t(dc, { path: e.path, current: e.current }) });
}
function tm(...e) {
  return e.some((n) => n === null);
}
function am(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function rm(e, n) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : n.offsetWidth + am(e);
}
function om(e, n, a, r, o) {
  if (o === 0 || tm(n, a, r)) return !1;
  const [l, s, c] = [n, a, r], d = Math.max(0, e.clientWidth - rm(e, l));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function lm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function im(e) {
  return xo(e) && (e.type === "a" || typeof e.props.href == "string");
}
function sm(e, n) {
  return n.length === 0 && e.length === 1 && im(e[0]);
}
function cm(e, n) {
  const a = f(null), r = f(null), o = f(null), l = f(null), [s, c] = v(!1);
  return S(() => {
    const d = a.current;
    if (!lm(d)) return;
    const u = () => c(om(d, r.current, o.current, l.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), l.current && h.observe(l.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: l, collapsed: s && !n };
}
function dm({ actions: e, hasMore: n, measureRef: a }) {
  return /* @__PURE__ */ t("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    n ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ t("span", { children: r }, o))
  ] }) });
}
function um({ connection: e }) {
  return e ? /* @__PURE__ */ t(Dt, { connection: e.connection, since: e.since }) : null;
}
function FL({ crumb: e, crumbCurrent: n, chips: a, title: r, consequence: o, consequenceHint: l, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: A } = cm(s, sm(s, c)), D = c.length > 0, { disclosure: we, close: ae } = Qh(A || D, N), Ce = Yh(c, s, A, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ t(nm, { crumb: em(e, r, n) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: w, children: [
      /* @__PURE__ */ t("div", { ref: _, className: G.headingWrap, children: /* @__PURE__ */ t(Vh, { title: r, chips: a, consequence: o, consequenceHint: l, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ t(um, { connection: d }),
        /* @__PURE__ */ t("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ t(Jh, { actions: s, hasMore: D, collapsed: A, onOverflow: u, disclosure: we }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Xh, { actions: Ce, disclosure: we, onEscape: ae }),
    /* @__PURE__ */ t(dm, { actions: s, hasMore: D, measureRef: k })
  ] });
}
const hm = "_root_td96x_2", mm = "_body_td96x_16", ma = {
  root: hm,
  body: mm
};
function zL({ variant: e = "info", ticket: n, children: a }) {
  if (!n) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${ma.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": n, children: /* @__PURE__ */ t("div", { className: ma.body, children: a }) });
}
const wm = "_tip_1oaay_2", _m = "_bubble_1oaay_1", wa = {
  tip: wm,
  bubble: _m
};
function WL({ label: e, text: n, align: a = "center" }) {
  const r = y(), [o, l] = v(!1), s = (u) => {
    u.key !== "Escape" || !o || (u.stopPropagation(), l(!1));
  }, c = () => l(!0), d = () => l(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      className: `${wa.tip} ward-infotip`,
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
          /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ t("path", { d: "M12 11v5M12 8h.01" })
        ] }),
        /* @__PURE__ */ t("span", { className: wa.bubble, role: "tooltip", id: r, children: n })
      ]
    }
  );
}
const fm = "_row_1jlay_2", vm = {
  row: fm
}, Ot = "custom", bm = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: Ot, label: "Custom range" }
], pm = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, gm = (e) => e.from !== "" && e.to !== "" && e.from > e.to, _a = { from: "", to: "" }, ym = (e, n) => n === null && "preset" in e ? e.preset : Ot;
function Nm({ range: e, today: n, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(E, { kind: "date", label: "From", value: e.from, max: e.to || n, onChange: a("from"), invalid: gm(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ t(E, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: n, onChange: a("to") })
  ] });
}
function KL({ value: e, onChange: n, today: a }) {
  const [r, o] = v("from" in e ? e : null), l = (c) => {
    if (c === Ot) return o(r ?? _a);
    o(null), n({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? _a, [c]: d };
    o(u), pm(u) && n(u);
  };
  return /* @__PURE__ */ i("div", { className: `${vm.row} ward-period`, children: [
    /* @__PURE__ */ t(E, { kind: "select", label: "Period", value: ym(e, r), options: bm, onChange: l }),
    r === null ? null : /* @__PURE__ */ t(Nm, { range: r, today: a, setEnd: s })
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
}, Bm = "—", fa = 6;
function Pm(e, n) {
  if (n.length < 1 || n.length > fa)
    throw new Error(`BarChart: ${n.length} series; the chart takes one to ${fa}`);
  const a = n.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function jm(e) {
  return Math.max(0, ...e.flatMap((n) => n.values.map((a) => a ?? 0)));
}
function Nr(e, n) {
  return n > 1 ? e + 1 : void 0;
}
function Dm(e, n) {
  return e !== null && n > 0 ? e / n * 100 : 0;
}
function Om({ value: e, top: n, step: a, format: r, missing: o }) {
  const l = Dm(e, n), s = { "--share": `${l}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ i("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: l > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? o : r(e) })
  ] }) });
}
function qm({ series: e }) {
  return /* @__PURE__ */ t(x, { children: e.map((n, a) => /* @__PURE__ */ i("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": Nr(a, e.length), "aria-hidden": "true" }) : null,
    n.name
  ] }, n.name)) });
}
function Hm({ title: e, empty: n = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: n })
  ] });
}
function Fm({ title: e, categories: n, series: a, top: r, format: o = te, categoryHead: l = "Category", missing: s = Bm }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: l }) }),
      /* @__PURE__ */ t(qm, { series: a })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ t(Om, { value: u.values[d], top: r, step: Nr(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function GL(e) {
  Pm(e.categories, e.series);
  const n = jm(e.series);
  return n === 0 ? /* @__PURE__ */ t(Hm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Fm, { ...e, top: n });
}
const zm = "_root_1bfqw_2", Wm = "_figure_1bfqw_7", Km = "_of_1bfqw_13", Gm = "_bar_1bfqw_18", Um = "_rows_1bfqw_38", Vm = "_row_1bfqw_38", Jm = "_label_1bfqw_49", Ym = "_amount_1bfqw_54", De = {
  root: zm,
  figure: Wm,
  of: Km,
  bar: Gm,
  rows: Um,
  row: Vm,
  label: Jm,
  amount: Ym
};
function Xm({ spent: e, ceiling: n, breakdown: a }) {
  const r = n > 0 ? Math.min(e / n, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${De.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${De.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ i("span", { className: De.of, children: [
        "of ",
        oe(n)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${De.bar} ward-costbar`,
        min: 0,
        max: n,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(n)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ t("ul", { className: De.rows, children: a.map((o) => /* @__PURE__ */ i("li", { className: `${De.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: De.label, children: o.label }),
      /* @__PURE__ */ t("span", { className: De.amount, children: oe(o.amount) })
    ] }, o.label)) })
  ] });
}
const Qm = "_frame_f7bxz_2", Zm = "_table_f7bxz_6", ew = "_th_f7bxz_12", nw = "_td_f7bxz_13", tw = "_sort_f7bxz_53", aw = "_row_f7bxz_65", rw = "_empty_f7bxz_73", Fe = {
  frame: Qm,
  table: Zm,
  th: ew,
  td: nw,
  sort: tw,
  row: aw,
  empty: rw
}, ow = { asc: "ascending", desc: "descending" };
function lw(e, n) {
  if (!(n === void 0 || n.key !== e.key))
    return ow[n.direction];
}
function iw(e, n) {
  return e.sortable && n ? /* @__PURE__ */ t("button", { type: "button", className: Fe.sort, onClick: () => n(e.key), children: e.header }) : e.header;
}
function sw(e) {
  return e === void 0 ? void 0 : { width: e };
}
function cw({ column: e, sort: n, onSort: a }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Fe.th,
      style: sw(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": lw(e, n),
      children: iw(e, a)
    }
  );
}
function dw({ row: e, props: n }) {
  const a = n.rowId(e), r = (n.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Fe.row,
      "data-selected": a === n.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: n.columns.map((o) => /* @__PURE__ */ t(
        "td",
        {
          className: Fe.td,
          "data-align": o.align,
          "data-mono": o.mono,
          "data-drop": o.dropPriority,
          "data-label": n.narrow ? o.header : void 0,
          children: n.renderCell(e, o.key)
        },
        o.key
      ))
    }
  );
}
function uw({
  label: e,
  columns: n,
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
  return a.length === 0 ? /* @__PURE__ */ t("div", { className: Fe.empty, children: u }) : /* @__PURE__ */ t("div", { className: Fe.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: Fe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Fe.head, children: n.map((w) => /* @__PURE__ */ t(cw, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((w) => /* @__PURE__ */ t(dw, { row: w, props: { label: e, columns: n, rows: a, rowId: r, renderCell: o, selectedId: l, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const hw = "_list_v0s52_2", mw = {
  list: hw
};
function ww({ children: e, label: n }) {
  return /* @__PURE__ */ t("ul", { className: mw.list, role: "list", "aria-label": n, "data-ward-plain-list": "", children: e });
}
const _w = "_label_1u62a_2", fw = {
  label: _w
};
function UL({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((n) => /* @__PURE__ */ t("th", { scope: "col", title: n.header, style: n.width === void 0 ? void 0 : { width: n.width }, children: /* @__PURE__ */ t("span", { className: fw.label, children: n.header }) }, n.key)) }) });
}
const vw = "_stack_bp6a0_2", bw = {
  stack: vw
};
function VL({ children: e }) {
  return /* @__PURE__ */ t("span", { className: bw.stack, "data-ward-action-stack": "", children: e });
}
const pw = "_set_1z0sq_2", gw = "_legend_1z0sq_7", yw = "_row_1z0sq_15", Nw = "_control_1z0sq_20", kw = "_input_1z0sq_26", $w = "_label_1z0sq_31", Cw = "_consequence_1z0sq_36", Ue = {
  set: pw,
  legend: gw,
  row: yw,
  control: Nw,
  input: kw,
  label: $w,
  consequence: Cw
};
function kr({ legend: e, options: n, value: a, onChange: r, disabled: o, name: l, describedBy: s, variant: c }) {
  const d = y(), u = l ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ue.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Ue.legend, children: e }),
    n.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ue.row, children: [
        /* @__PURE__ */ i("span", { className: Ue.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ue.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": un(_, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: Ue.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ t("p", { id: _, className: `${Ue.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Sw = "_root_11gpw_2", Rw = "_head_11gpw_10", xw = "_note_11gpw_29", Tw = "_index_11gpw_34", Lw = "_dot_11gpw_38", Aw = "_counter_11gpw_49", Mw = "_trailing_11gpw_57", Je = {
  root: Sw,
  head: Rw,
  note: xw,
  index: Tw,
  dot: Lw,
  counter: Aw,
  trailing: Mw
};
function Iw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("span", { className: `${Je.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Je.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ew({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Je.counter, "aria-hidden": "true", children: e }) : null;
}
function va({ title: e, index: n, note: a, counter: r, kind: o = "micro", trailing: l }) {
  return /* @__PURE__ */ i("div", { className: `${Je.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ i("h2", { className: Je.head, children: [
      /* @__PURE__ */ t(Iw, { index: n }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ t("span", { className: Je.note, children: a }),
    /* @__PURE__ */ t(Ew, { counter: r }),
    l === void 0 ? null : /* @__PURE__ */ t("span", { className: Je.trailing, children: l })
  ] });
}
const Bw = "_strip_c3x3u_2", Pw = "_cell_c3x3u_7", jw = "_value_c3x3u_12", Dw = "_link_c3x3u_29", Ow = "_label_c3x3u_49", qw = "_tiles_c3x3u_101", We = {
  strip: Bw,
  cell: Pw,
  value: jw,
  link: Dw,
  label: Ow,
  tiles: qw
};
function $r(e, n, [a, r]) {
  if (n.length < a || n.length > r)
    throw new Error(`${e}: ${n.length} cells — it takes ${a} to ${r}`);
  if (n.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Cr = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Hw({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Cr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function Fw({ cell: e, href: n }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Cr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${We.link} ward-stat-link`, href: T(n), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Sr = (e) => e.href === void 0 ? /* @__PURE__ */ t(Hw, { cell: e }, e.label) : /* @__PURE__ */ t(Fw, { cell: e, href: e.href }, e.label);
function Zn({ cells: e, divided: n = !1 }) {
  return $r("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${We.strip} ward-statstrip`, "data-divided": n || void 0, children: e.map(Sr) });
}
const ba = 6;
function JL({ cells: e }) {
  $r("StatTiles", e, [1, 2 * ba]);
  const n = { "--ward-stat-tiles-columns": Math.min(e.length, ba) };
  return /* @__PURE__ */ t("dl", { className: `${We.tiles} ward-stattiles`, style: n, children: e.map(Sr) });
}
const zw = "_root_1eb1u_2", Ww = "_track_1eb1u_8", Kw = "_thumb_1eb1u_46", Gw = "_labelHidden_1eb1u_64", Uw = "_label_1eb1u_64", ln = {
  root: zw,
  track: Ww,
  thumb: Kw,
  labelHidden: Gw,
  label: Uw
};
function Vw(e, n, a, r) {
  return { on: a ? !0 : e, off: !!(n || a || r) };
}
function Jw(e) {
  return e ? `${ln.label} ${ln.labelHidden}` : ln.label;
}
function Yw(e, n, a) {
  return e && !n && a ? a : void 0;
}
function Xw(e, n, a, r) {
  return { "aria-describedby": Xn(un(n, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Qw({ id: e, reason: n }) {
  return n ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: n }) : null;
}
function Xe({ label: e, checked: n, onChange: a, disabled: r, locked: o, describedBy: l, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = je(), { on: _, off: N } = Vw(n, r, o, w !== null), k = Yw(N, w !== null, c);
  return /* @__PURE__ */ i("span", { className: `${ln.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...Xw(h, l, w, k),
        className: `${ln.track} ward-switch`,
        "data-on": _,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ t("span", { className: ln.thumb })
      }
    ),
    /* @__PURE__ */ t("label", { id: d, htmlFor: u, className: Jw(s), children: e }),
    /* @__PURE__ */ t(Qw, { id: h, reason: k })
  ] });
}
const Zw = "_bar_1vp69_2", e_ = "_skip_1vp69_11", n_ = "_mark_1vp69_22", t_ = "_nav_1vp69_30", a_ = "_list_1vp69_34", r_ = "_select_1vp69_41", o_ = "_selectTrigger_1vp69_45", l_ = "_dest_1vp69_52", i_ = "_actor_1vp69_71", s_ = "_actorMark_1vp69_84", c_ = "_actorLabel_1vp69_89", d_ = "_tagline_1vp69_108", ce = {
  bar: Zw,
  skip: e_,
  mark: n_,
  nav: t_,
  list: a_,
  select: r_,
  selectTrigger: o_,
  dest: l_,
  actor: i_,
  actorMark: s_,
  actorLabel: c_,
  tagline: d_
};
function u_(e) {
  return e.split(/\s+/).slice(0, 2).map((n) => n[0] ?? "").join("").toUpperCase();
}
function h_(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function YL({ wordmark: e = "Trellis", destinations: n, active: a, actor: r, tagline: o, onNavigate: l, skipTo: s = "main" }) {
  const c = h_(r);
  return /* @__PURE__ */ i("header", { className: ce.bar, children: [
    /* @__PURE__ */ t("a", { className: `${ce.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: ce.mark, children: e }),
    o && /* @__PURE__ */ t("span", { className: ce.tagline, children: o }),
    /* @__PURE__ */ i("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: ce.list, children: n.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${ce.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => l == null ? void 0 : l(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        sr,
        {
          className: ce.select,
          triggerClassName: ce.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: n.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => l == null ? void 0 : l(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: ce.actor, children: [
      /* @__PURE__ */ t("span", { className: ce.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: ce.actorMark, "aria-hidden": "true", children: u_(c) })
    ] })
  ] });
}
const m_ = "_tree_zzoob_2", w_ = "_item_zzoob_6", __ = "_row_zzoob_10", f_ = "_button_zzoob_22", Hn = {
  tree: m_,
  item: w_,
  row: __,
  button: f_
}, Rr = $e(null);
function v_({ label: e, children: n }) {
  const { containerProps: a, itemProps: r } = Jn({ orientation: "vertical" });
  return /* @__PURE__ */ t(Rr.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: Hn.tree, role: "tree", "aria-label": e, ...a, children: n }) });
}
const b_ = { ArrowRight: !0, ArrowLeft: !1 };
function pa(e) {
  return e ? !0 : void 0;
}
function p_(e, n) {
  const a = b_[e.key];
  !n.leaf && n.onToggle && a !== void 0 && !!n.expanded !== a && n.onToggle();
}
function g_(e) {
  var n, a;
  e.leaf || (n = e.onToggle) == null || n.call(e), (a = e.onSelect) == null || a.call(e);
}
function y_(e) {
  const n = [Hn.row, "ward-treerow"];
  return e.unresolved && n.push("ward-treerow--unresolved"), e.inherited && n.push("ward-treerow--inherited"), n.join(" ");
}
function N_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function k_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function $_(e) {
  return typeof e == "string" ? e : void 0;
}
function C_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function S_({ unresolved: e, inherited: n }) {
  const a = [e ? "unresolved" : "", n ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function xr(e) {
  const n = pe(Rr);
  if (!n) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = N_(e);
  return /* @__PURE__ */ i("li", { className: Hn.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: y_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": pa(e.unresolved),
        "data-inherited": pa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${Hn.button} ward-treeitem-btn`,
            onClick: () => g_(e),
            onKeyDown: (r) => p_(r, e),
            ...n(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: k_(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: $_(e.label), children: e.label }),
              /* @__PURE__ */ t(C_, { value: e.detail }),
              /* @__PURE__ */ t(S_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const R_ = "_frame_gxspk_2", x_ = "_subjectRail_gxspk_22", T_ = "_subject_gxspk_22", L_ = "_rail_gxspk_42", A_ = "_record_gxspk_57", M_ = "_recordBody_gxspk_102", I_ = "_stageGrid_gxspk_157", E_ = "_band_gxspk_171", B_ = "_bandBody_gxspk_179", P_ = "_bandActions_gxspk_184", j_ = "_scroller_gxspk_192", D_ = "_board_gxspk_219", O_ = "_lanes_gxspk_228", q_ = "_cardGrid_gxspk_262", Q = {
  frame: R_,
  subjectRail: x_,
  subject: T_,
  rail: L_,
  record: A_,
  recordBody: M_,
  stageGrid: I_,
  band: E_,
  bandBody: B_,
  bandActions: P_,
  scroller: j_,
  board: D_,
  lanes: O_,
  cardGrid: q_
};
function XL({ children: e, as: n = "main", inset: a = "page" }) {
  return /* @__PURE__ */ t(n, { className: Q.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ga(e) {
  return e ? "true" : void 0;
}
function QL({ children: e, rail: n, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: l }) {
  return /* @__PURE__ */ i("div", { className: Q.subjectRail, "data-ward-subject-rail": a, "data-ruled": ga(l), children: [
    /* @__PURE__ */ t("div", { className: Q.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Q.rail, "data-sticky": ga(o), "aria-label": r, children: n })
  ] });
}
function ZL({ title: e, children: n, note: a, trailing: r, pad: o = "block", label: l, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Q.record, "aria-label": l, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ t(va, { kind: "key", title: e, note: n, trailing: r }) }) : /* @__PURE__ */ i("section", { className: Q.record, "aria-label": l, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ t(va, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ t("div", { className: Q.recordBody, "data-pad": o, "data-measure": c, children: n })
  ] });
}
const H_ = "_form_1j8ub_2", F_ = "_fields_1j8ub_9", z_ = "_actions_1j8ub_19", it = {
  form: H_,
  fields: F_,
  actions: z_
};
function e3({ label: e, children: n, actions: a, onSubmit: r }) {
  const o = (l) => {
    l.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: it.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: it.fields, children: n }),
    a == null ? null : /* @__PURE__ */ t("div", { className: it.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function n3({ children: e, actions: n, label: a }) {
  return /* @__PURE__ */ i("section", { className: Q.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Q.bandBody, children: e }),
    n === void 0 ? null : /* @__PURE__ */ t("div", { className: Q.bandActions, children: n })
  ] });
}
const W_ = "(max-width: 767.98px)";
function qt({ label: e, children: n, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ t(Mt, { className: Q.scroller, label: e, count: a ?? Ha.count(n), "data-ward-board-scroller": "", style: r, children: n });
}
function K_({ lanes: e, label: n, laneLabel: a }) {
  const [r, o] = v(null), l = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: Q.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(E, { kind: "select", label: a, value: (l == null ? void 0 : l.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ t(qt, { label: n, children: l == null ? void 0 : l.content })
  ] });
}
function G_({ lanes: e, label: n }) {
  return /* @__PURE__ */ t("div", { className: Q.board, "data-ward-board": "", children: /* @__PURE__ */ t(qt, { label: n, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ t(qa, { children: a.content }, a.id)) }) });
}
function t3({ children: e, label: n = "Board", lanes: a, laneLabel: r = "Column" }) {
  const o = pn(W_);
  return a === void 0 ? /* @__PURE__ */ t(qt, { label: n, children: e }) : o ? /* @__PURE__ */ t(K_, { lanes: a, label: n, laneLabel: r }) : /* @__PURE__ */ t(G_, { lanes: a, label: n });
}
function a3({ columns: e, children: n, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), l = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ t(Mt, { className: Q.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: l, children: n });
}
function r3({ children: e, label: n }) {
  return /* @__PURE__ */ t("div", { className: `${Q.cardGrid} ward-cardgrid`, role: n === void 0 ? void 0 : "region", "aria-label": n, "data-ward-card-grid": "", children: e });
}
const U_ = "_block_6tv5x_3", V_ = "_sentence_6tv5x_10", J_ = "_meta_6tv5x_19", Y_ = "_ways_6tv5x_24", X_ = "_action_6tv5x_38", Q_ = "_strip_6tv5x_42", Z_ = "_loading_6tv5x_61", ef = "_label_6tv5x_69", nf = "_counter_6tv5x_76", be = {
  block: U_,
  sentence: V_,
  meta: J_,
  ways: Y_,
  action: X_,
  strip: Q_,
  loading: Z_,
  label: ef,
  counter: nf
};
function tf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function et({ sentence: e, action: n, children: a, role: r = "status", tone: o, kind: l, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${be.block} ward-state${l === void 0 ? "" : ` ${l}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ i("p", { className: be.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ t("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ t(tf, { action: n })
  ] });
}
function af(e) {
  return /* @__PURE__ */ t(et, { ...e, kind: "ward-emptystate" });
}
function o3({ sentence: e, total: n, action: a }) {
  return /* @__PURE__ */ t(et, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "0 of ",
    n,
    " match the filter"
  ] }) });
}
function rf({ ways: e }) {
  return /* @__PURE__ */ t("div", { className: `${be.ways} ward-state-ways`, children: e.map((n) => /* @__PURE__ */ t(b, { variant: "secondary", onClick: n.onClick, children: n.label }, n.label)) });
}
function l3({ ways: e, ...n }) {
  return /* @__PURE__ */ t(et, { ...n, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(rf, { ways: e }) });
}
function i3({ sentence: e, at: n, onRetry: a }) {
  return /* @__PURE__ */ t(et, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "failed at ",
    me(n)
  ] }) });
}
function s3({ lastReachableAt: e, snapshotAt: n }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(n)
  ] });
}
function c3({ queued: e, since: n }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(n)
  ] });
}
function d3({ label: e, startedAt: n }) {
  const a = f(n ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = v(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), ye.load);
    return () => window.clearTimeout(s);
  }, []);
  const l = Lt(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: xt(l) }) : null
  ] });
}
const of = "_note_cigdt_2", lf = {
  note: of
};
function sf({ label: e, count: n, cap: a }) {
  return /* @__PURE__ */ i("p", { className: lf.note, role: "status", children: [
    e,
    " is over cap now: ",
    n,
    " items against ",
    a
  ] });
}
const cf = "_card_k7btg_3", df = "_hit_k7btg_31", uf = "_head_k7btg_44", hf = "_title_k7btg_51", mf = "_meta_k7btg_57", wf = "_since_k7btg_66", _f = "_sep_k7btg_76", ff = "_fields_k7btg_80", vf = "_field_k7btg_80", bf = "_last_k7btg_98", pf = "_reason_k7btg_110", he = {
  card: cf,
  hit: df,
  head: uf,
  title: hf,
  meta: mf,
  since: wf,
  sep: _f,
  fields: ff,
  field: vf,
  last: bf,
  reason: pf
}, gf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function yf(e, n, a) {
  const r = En(e, "blue"), o = En(e, "orange"), l = En(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: l };
    return a.subscribe(n, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = gf[d.type];
      u && c[u]();
    });
  }, [r, a, l, n, o]);
}
const Nf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function kf(e, n) {
  return Nf[n](e);
}
function $f({ item: e, connection: n }) {
  const a = /* @__PURE__ */ t("span", { className: he.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ t(Pe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep })
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
  const n = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "Off plan" }),
    n && /* @__PURE__ */ t(m, { role: n.role, label: n.label })
  ] });
}
function Sf({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Rf({ item: e, fields: n }) {
  return n.length === 0 ? null : /* @__PURE__ */ t("p", { className: he.fields, children: n.map((a) => /* @__PURE__ */ t("span", { className: he.field, children: kf(e, a) }, a)) });
}
const pt = (e) => e ? !0 : void 0;
function xf(e) {
  return { "--stream": ke(e.streamStep, "id") };
}
function Tf(e, n, a) {
  e == null || e(n, a);
}
function Lf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Af({ item: e, stale: n }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ t("p", { className: he.last, "data-stale": pt(n), children: a }) : null;
}
function nt(e) {
  const n = e.fields ?? [], a = e.item, r = f(null);
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
      "data-selected": pt(e.selected),
      "data-flagged": pt(a.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: he.hit, onClick: (s) => Tf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ t(Cf, { item: a }),
        /* @__PURE__ */ t(cn, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ t($f, { item: a, connection: o }),
        /* @__PURE__ */ t(Sf, { reason: a.blockedReason }),
        /* @__PURE__ */ t(Rf, { item: a, fields: n }),
        /* @__PURE__ */ t(Af, { item: a, stale: o === "stale" })
      ]
    }
  );
}
function kn(e, n) {
  return e.trim().toLowerCase() === n.toLowerCase();
}
const Mf = "_column_1j8bi_3", If = "_head_1j8bi_21", Ef = "_label_1j8bi_30", Bf = "_count_1j8bi_39", Pf = "_list_1j8bi_53", vn = {
  column: Mf,
  head: If,
  label: Ef,
  count: Bf,
  list: Pf
};
function Tr(e, n) {
  return [...e].sort((a, r) => n === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function jf({ column: e, count: n, id: a }) {
  return /* @__PURE__ */ i("div", { className: vn.head, children: [
    /* @__PURE__ */ t("h2", { className: vn.label, id: a, title: e.label, children: e.label }),
    e.gate && !kn(e.label, "Review") && /* @__PURE__ */ t(m, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: vn.count, children: [
      n,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Df(e) {
  return /* @__PURE__ */ t("div", { className: vn.list, role: "list", children: e.rows.map((n, a) => {
    var r;
    return /* @__PURE__ */ t(
      nt,
      {
        item: n,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: n.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + a),
        inList: !0
      },
      n.key
    );
  }) });
}
function Of({ column: e, items: n, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && n.length > e.cap, w = Tr(n, r);
  return /* @__PURE__ */ i("section", { className: vn.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(jf, { column: e, count: n.length, id: u }),
    /* @__PURE__ */ t(Df, { column: e, items: n, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ t(sf, { label: e.label, count: n.length, cap: e.cap })
  ] });
}
const qf = "_foot_cs4jr_2", Hf = "_note_cs4jr_13", Ff = "_link_cs4jr_19", st = {
  foot: qf,
  note: Hf,
  link: Ff
};
function u3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: st.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: st.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${st.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const zf = "_head_1tfi5_3", Wf = "_identity_1tfi5_12", Kf = "_titleRow_1tfi5_18", Gf = "_title_1tfi5_18", Uf = "_key_1tfi5_35", Vf = "_rollup_1tfi5_45", Jf = "_tools_1tfi5_53", Yf = "_swatch_1tfi5_101", Xf = "_mark_1tfi5_108", Te = {
  head: zf,
  identity: Wf,
  titleRow: Kf,
  title: Gf,
  key: Uf,
  rollup: Vf,
  tools: Jf,
  swatch: Yf,
  mark: Xf
}, ya = "initials:";
function Qf(e) {
  return e === void 0 ? "done this week unknown" : `${te(e)} done this week`;
}
function Zf(e) {
  const n = [Qf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && n.push(`${te(e.agentsWorking)} agents working`), e.p50 !== void 0 && n.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && n.push(`P90 ${se(e.p90)}`), n.join(" · ");
}
function ev(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      te(e.inFlight),
      " open"
    ] }),
    " · ",
    Zf(e)
  ] });
}
function nv(e) {
  return e.startsWith(ya) ? e.slice(ya.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function tv({ markRef: e, streamStep: n }) {
  const a = { "--stream": ke(n, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${Te.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: nv(e) }) : /* @__PURE__ */ t("span", { className: Te.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function av({ owners: e, owner: n, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(E, { kind: "select", label: "Owner", value: n ?? e[0].value, onChange: a, options: e });
}
function h3({
  stream: e,
  rollups: n,
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
        /* @__PURE__ */ t(tv, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: Te.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: Te.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: Te.rollup, "aria-live": "polite", children: ev(n) })
    ] }),
    /* @__PURE__ */ i("div", { className: Te.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(av, { owners: o, owner: l, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(Dt, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const rv = "_head_1sejb_14", ov = "_line_1sejb_15", lv = "_cHandle_1sejb_36", iv = "_cName_1sejb_41", sv = "_nameLine_1sejb_49", cv = "_cLabel_1sejb_56", dv = "_cCap_1sejb_61", uv = "_cShown_1sejb_66", hv = "_name_1sejb_49", mv = "_noCap_1sejb_88", wv = "_state_1sejb_102", _v = "_handle_1sejb_111", q = {
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
  state: wv,
  handle: _v
}, fv = "Review stages always show.", vv = "Done stages are counted, not shown.";
function m3() {
  return /* @__PURE__ */ i("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: q.cHandle }),
    /* @__PURE__ */ t("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: q.cShown, children: "Shown" })
  ] });
}
function bv(e, n) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: n, state: n ? "on" : "off" };
}
function pv(e, n) {
  e.key === "ArrowUp" && (n == null || n(-1)), e.key === "ArrowDown" && (n == null || n(1));
}
function gv({ stage: e }) {
  return /* @__PURE__ */ t("span", { className: q.cName, children: /* @__PURE__ */ i("span", { className: q.nameLine, children: [
    /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
    e.gate && !kn(e.name, "Review") && /* @__PURE__ */ t(m, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function yv(e) {
  return e === void 0 ? "" : String(e);
}
function Nv(e) {
  return e === "" ? void 0 : Number(e);
}
function kv({ name: e, onReorder: n }) {
  const a = je();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ t("span", { className: q.cHandle }) : /* @__PURE__ */ t("span", { className: q.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && pv(r, n),
      children: "⠿"
    }
  ) });
}
function $v({ stage: e, config: n, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: q.cCap, children: /* @__PURE__ */ t(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: yv(n.cap), onChange: (r) => a({ ...n, cap: Nv(r) }) }) });
}
function Cv(e) {
  return e.gate ? fv : e.terminal ? vv : void 0;
}
function Sv({ stage: e, config: n, onChange: a }) {
  const r = je() !== null, o = bv(e, n.shown), l = e.gate || e.terminal || r, s = (c) => a({ ...n, shown: c });
  return /* @__PURE__ */ i("span", { className: q.cShown, children: [
    /* @__PURE__ */ t(Xe, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: Cv(e), onChange: s }),
    /* @__PURE__ */ t("span", { className: q.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && s(!o.shown), children: o.state })
  ] });
}
function Rv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function w3({ stage: e, config: n, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: q.line, "data-kind": Rv(e), children: [
    /* @__PURE__ */ t(kv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(gv, { stage: e }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: /* @__PURE__ */ t(E, { kind: "input", label: "Column label", labelHidden: !0, value: n.label, onChange: (o) => a({ ...n, label: o }) }) }),
    /* @__PURE__ */ t($v, { stage: e, config: n, onChange: a }),
    /* @__PURE__ */ t(Sv, { stage: e, config: n, onChange: a })
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
function Wv(e, n) {
  if (!e.run) return [];
  const a = (n == null ? void 0 : n.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Pe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Kv(e) {
  return (e ?? []).map((n, a) => [n.label, n.value, `fact-${a}`]);
}
function Gv(e, n, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...zv(e),
    ...Kv(a),
    ...Wv(e, n)
  ];
}
function Uv({ resolve: e, label: n }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: z.resolve, "aria-label": n, children: [
    /* @__PURE__ */ t("h3", { className: z.k, children: n }),
    e
  ] });
}
function Vv(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function Jv({ item: e, showKey: n }) {
  const a = Vv(e);
  return !n && !a ? null : /* @__PURE__ */ i("div", { className: z.head, children: [
    n && /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Yv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: z.block, children: [
    /* @__PURE__ */ t("p", { className: z.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: z.note, children: e.agentMeta })
  ] }) : null;
}
function _3({ item: e, actions: n, onClose: a, returnFocusTo: r, feed: o, resolve: l, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = Gv(e, o, d);
  return /* @__PURE__ */ t(hn, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: z.body, children: [
    /* @__PURE__ */ t(Jv, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: z.summary, children: [
      /* @__PURE__ */ t("h2", { className: z.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: z.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: z.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: z.row, children: [
      /* @__PURE__ */ t("dt", { className: z.label, children: _ }),
      /* @__PURE__ */ t("dd", { className: z.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ t(Yv, { item: e }),
    /* @__PURE__ */ i("div", { className: z.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: z.actions, children: n }),
      c && /* @__PURE__ */ t("p", { className: z.note, children: c })
    ] }),
    /* @__PURE__ */ t(Uv, { resolve: l, label: s ?? "Next steps" })
  ] }) });
}
const Xv = "_root_3azmy_2", Qv = "_list_3azmy_7", Zv = "_item_3azmy_12", eb = "_box_3azmy_18", nb = "_text_3azmy_23", tb = "_note_3azmy_28", Ze = {
  root: Xv,
  list: Qv,
  item: Zv,
  box: eb,
  text: nb,
  note: tb
};
function tt({ items: e, note: n, density: a }) {
  return /* @__PURE__ */ i("div", { className: Ze.root, "data-density": a, children: [
    /* @__PURE__ */ t("ul", { className: `${Ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${Ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ze.box, children: /* @__PURE__ */ t(jt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ze.text, children: r.text })
    ] }, r.text)) }),
    n !== void 0 && /* @__PURE__ */ t("p", { className: `${Ze.note} ward-checklist-note`, children: n })
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
  return (n) => e == null ? void 0 : e(n);
}
function Lr({ title: e, children: n }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: de.k, children: e }),
    n
  ] });
}
function wb({ effects: e }) {
  const n = e.filter((a) => !a.met);
  return n.length === 0 ? null : /* @__PURE__ */ t(Lr, { title: "Warnings", children: /* @__PURE__ */ t(tt, { items: n, density: "compact" }) });
}
function _b({ column: e, count: n }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${n} ${n === 1 ? "item" : "items"}` }),
    Array.from({ length: n }, (a, r) => /* @__PURE__ */ t("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function fb({ draft: e, sample: n, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ t(Of, { column: o, items: n.filter((l) => l.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function vb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(fb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((n) => /* @__PURE__ */ t(_b, { column: n, count: e.sample.filter((a) => a.stage === n.id).length }, n.id));
}
function f3(e) {
  const n = mb(e.onOpen), a = Tr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ t("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ t("div", { className: de.card, children: a && /* @__PURE__ */ t(nt, { item: a, fields: e.draft.fields, onOpen: n, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Lr, { title: "Columns", children: [
      /* @__PURE__ */ t("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(vb, { ...e, open: n }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(wb, { effects: e.effects })
  ] });
}
function bb(e, n) {
  return (a) => {
    e.current = a, n(a);
  };
}
function pb(e) {
  return Math.ceil(e.length / 2);
}
function gb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ar(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function yb(e, n, a, r) {
  if (n.current.has(e.id)) return;
  n.current.add(e.id);
  const o = Ar(e);
  o !== void 0 && a(o), r(gb(e.type));
}
function Nb(e, n, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(n, (l) => yb(l, a, r, o));
  }, [e, n, a, r, o]);
}
function kb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function $b(e, n) {
  return n ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Cb(e, n) {
  return n !== void 0 ? se(e.timeInStage) + " · waits on " + n.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Sb(e, n) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + P.height.card + " + " + P.height.cardRow + " * " + String(pb(n ?? [])) + ")"
  };
}
function Rb(e, n) {
  return /* @__PURE__ */ t("span", { className: (n ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function xb(e, n) {
  return e.cost !== void 0 && (n ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: oe(e.cost) }) : null;
}
function Tb(e, n) {
  return e.jiraKey !== void 0 && (n ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function Lb(e, n, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Pe, { startedAt: e.startedAt, lastEvent: n === void 0 ? void 0 : { label: n, at: r }, connection: a ?? "live", turn: e.turn });
}
function Ab(e, n, a) {
  return n === void 0 ? e.finding ?? "" : a ?? "";
}
function Mb(e, n) {
  return n === void 0 ? e : bb(e, n.ref);
}
function Ib(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function gn(e) {
  return e === !0 ? "true" : void 0;
}
function Mr(e) {
  const n = e.item, a = n.run, r = a !== void 0, o = f(null), l = En(o), s = f(/* @__PURE__ */ new Set()), [c, d] = v(kb(n));
  Nb(e.feed, n.key, s, d, l);
  const u = $b(n, r), h = Cb(n, a), w = Sb(n, e.fields), _ = Ab(n, a, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Ib(e),
      className: "ward-workcard",
      "data-flagged": gn(n.flagged),
      "data-selected": gn(e.selected),
      style: w,
      ref: Mb(o, e.rovingItem),
      onClick: () => e.onOpen(n.key),
      children: [
        Rb(n, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: n.title, children: n.title }),
        n.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: u.role, label: u.label }),
          xb(n, e.fields),
          Tb(n, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          Lb(a, c, e.connection, n.changedAt),
          _ !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function Eb({ count: e, cap: n }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(n) + ". Move " + String(e - n) + " out or raise the cap." });
}
function Bb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Pb(e, n, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(n) })
    ] })
  ] });
}
function jb(e, n) {
  return !n || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Eb, { count: e.items.length, cap: e.column.cap });
}
function Db(e, n) {
  return e.roving ?? n;
}
function Ob(e, n) {
  return e.roving === void 0 ? n.containerProps : {};
}
function qb(e, n) {
  return e.items.map((a, r) => /* @__PURE__ */ t(
    Mr,
    {
      item: a,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: a.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: n.itemProps(r)
    },
    a.key
  ));
}
function Hb(e) {
  const n = y(), a = Jn({ orientation: "vertical" }), r = Db(e, a), o = Bb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": n, "data-overcap": gn(o), "data-gate": gn(e.column.gate), children: [
    Pb(e.column, e.items.length, n),
    jb(e, o),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Ob(e, a), children: qb(e, r) })
  ] });
}
function Fb(e) {
  let n = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (n += " · p50 " + se(e.p50)), e.p90 !== void 0 && (n += " · p90 " + se(e.p90)), n;
}
function zb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((n) => ({ value: n, label: n })), onChange: e.onOwnerChange });
}
function Wb(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function v3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Fb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      zb(e),
      Wb(e.onConfigure),
      /* @__PURE__ */ t(Dt, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Kb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Gb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (n) => e.onChange({ ...e.config, shown: n }) });
}
function Ub(e) {
  const n = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    n > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(n) + (n === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "Done" }) : null
  ] });
}
function b3(e) {
  const n = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": gn(Kb(n)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Gb(e) }),
    /* @__PURE__ */ t(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: n.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ t(er, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Ub(n),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + n.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + n.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function p3(e) {
  const n = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    n !== void 0 ? /* @__PURE__ */ t(Mr, { item: n, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Hb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Vb(e, n) {
  const a = Ar(e);
  a !== void 0 && n(a);
}
function Jb(e, n, a) {
  S(() => {
    if (e != null)
      return e.subscribe(n, (r) => Vb(r, a));
  }, [e, n, a]);
}
function Yb(e) {
  const n = [["key", e.key]];
  return e.stream !== void 0 && n.push(["stream", e.stream.name]), e.workflow !== void 0 && n.push(["workflow", e.workflow]), e.state !== void 0 && n.push(["state", e.state.label]), n;
}
function Xb(e) {
  const n = [];
  return e.timeInStage !== void 0 && n.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && n.push(["waits on", e.waitsOn]), e.cost !== void 0 && n.push(["cost", oe(e.cost)]), n;
}
function Qb(e, n) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Pe, { startedAt: e.startedAt, lastEvent: n === void 0 ? void 0 : { label: n, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Zb(e, n) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    n !== void 0 && n.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: n }) : null
  ] });
}
function g3(e) {
  var s;
  const n = e.item, a = n.run, [r, o] = v((s = n.run) == null ? void 0 : s.lastStep);
  Jb(e.feed, n.key, o);
  const l = [...Yb(n), ...Xb(n)];
  return /* @__PURE__ */ i(hn, { kind: "drawer", title: n.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      l.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Qb(a, r)
    ] }),
    Zb(n, e.actions)
  ] });
}
const ep = "_card_1nkkx_3", np = "_head_1nkkx_30", tp = "_mark_1nkkx_38", ap = "_name_1nkkx_50", rp = "_chips_1nkkx_71", op = "_description_1nkkx_77", lp = "_run_1nkkx_82", ip = "_sep_1nkkx_91", sp = "_facts_1nkkx_97", cp = "_fact_1nkkx_97", dp = "_factLabel_1nkkx_111", up = "_factValue_1nkkx_115", ie = {
  card: ep,
  head: np,
  mark: tp,
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
function wp({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: ie.chips, children: e.map((n) => /* @__PURE__ */ t(m, { role: hp[n.status], size: "tag", label: n.label ?? `${n.v} ${n.status}` }, n.v)) });
}
function _p({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: ie.description, children: e });
}
function fp({ run: e, connection: n, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Pe, { startedAt: e.startedAt, connection: n ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function vp({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: ie.facts, children: e.map((n) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ t("dt", { className: ie.factLabel, children: n.label }),
    /* @__PURE__ */ t("dd", { className: ie.factValue, children: n.value })
  ] }, n.label)) });
}
function bp(e) {
  return e.length > 0 && e.every((n) => n.status === "paused") ? !0 : void 0;
}
function pp({ agent: e, href: n, selected: a, connection: r = "live", lastEvent: o, facts: l, className: s }) {
  const c = { "--stream": ke(e.streamStep, "id") }, d = a ? "true" : void 0;
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
          /* @__PURE__ */ t("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(n), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(_p, { description: e.description }),
        /* @__PURE__ */ t(fp, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ t(wp, { versions: e.versions }),
        /* @__PURE__ */ t(vp, { facts: l })
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
}, Ir = $e(!1);
function y3({ children: e, label: n = "Rules" }) {
  return /* @__PURE__ */ t(Ir.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ue.list, "aria-label": n, children: e }) });
}
function Mp({ clause: e, ruleId: n, onChange: a }) {
  if (!a) return /* @__PURE__ */ t("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(E, { kind: r, labelHidden: !0, label: `${n} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Ip({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ue.reason, children: e })
  ] });
}
function Ep({ rule: e, onRemove: n }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ t("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Ip, { reason: e.lockedReason }),
    n && /* @__PURE__ */ t("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: n, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Na(e, n) {
  return e.locked ? void 0 : n;
}
function N3({ rule: e, onChange: n, onRemove: a }) {
  if (!pe(Ir)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Na(e, n);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Ep, { rule: e, onRemove: Na(e, a) }),
    /* @__PURE__ */ t("dl", { className: ue.clauses, children: e.clauses.map((o) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ t("dt", { className: ue.label, children: o.label }),
      /* @__PURE__ */ t("dd", { className: ue.cell, children: /* @__PURE__ */ t(Mp, { clause: o, ruleId: e.id, onChange: r }) })
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
}, k3 = "Not available yet";
function Vp(e) {
  return e.reserved ? "reserved" : yn(e.step) ? "validated" : "partial";
}
function Er(e, n) {
  return n !== void 0 && e !== "reserved" ? `taken by ${n}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function Jp(e, n) {
  return n === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Yp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${le.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Xp(e, n) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), n());
}
function Qp(e, n, a) {
  return {
    "aria-checked": n,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": n ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ka = (e) => String(e).padStart(2, "0");
function Zp(e, n, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : n ?? Er(e, void 0);
}
function eg({ step: e, validation: n, note: a }) {
  const r = n === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("span", { className: `${le.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${le.hex} ward-ladder-hex`, children: r ? `step ${ka(e)}` : Jo(e) }),
    /* @__PURE__ */ t("span", { className: `${le.note} ward-ladder-note`, children: r ? a : `Step ${ka(e)} · ${a}` })
  ] });
}
function ng({ step: e, value: n, taken: a, onChange: r, presentation: o, disabled: l }) {
  const s = Vp(e), c = Er(s, a), d = c !== "free", u = d || l, h = n === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Qp(d, h, u), "data-validation": s, style: Jp(e, s), onClick: _, onKeyDown: (A) => Xp(A, _) }, label: N, name: w, holder: c, validation: s, note: Zp(s, a, h), step: e.step };
}
const tg = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${le.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${le.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(eg, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${le.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Yp, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${le.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${le.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ag(e) {
  return tg[e.presentation](ng(e));
}
function rg(e) {
  for (const n of e)
    if (!n.reserved && !Yn(n.step)) throw new Error("colour ladder renders token steps only");
}
function og(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const lg = { list: le.ladder, swatches: le.swatches, tiles: le.tilesFrame };
function ig(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Br(e) {
  const n = e.takenBy ?? {}, a = (l) => {
    var s;
    (s = e.onChange) == null || s.call(e, l);
  };
  rg(e.steps);
  const r = og(e), o = e.steps.map((l) => /* @__PURE__ */ t(ag, { step: l, value: e.value, taken: n[l.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, l.step));
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...ig(e.disabled === !0), className: `${lg[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: le.tiles, children: o }) : o });
}
const sg = "_rail_s06lm_2", cg = "_section_s06lm_12", dg = "_sectionFlush_s06lm_22", ug = "_head_s06lm_26", hg = "_headLabel_s06lm_34", mg = "_sample_s06lm_42", wg = "_sampleLabel_s06lm_47", _g = "_sampleTitle_s06lm_54", fg = "_sampleMeta_s06lm_59", vg = "_trace_s06lm_65", bg = "_traceHead_s06lm_70", pg = "_steps_s06lm_78", gg = "_step_s06lm_78", yg = "_stepTitle_s06lm_97", Ng = "_hollow_s06lm_107", kg = "_stepBody_s06lm_115", $g = "_stepDetail_s06lm_127", Cg = "_publish_s06lm_132", Sg = "_reason_s06lm_138", Rg = "_note_s06lm_143", xg = "_reveal_s06lm_148", $ = {
  rail: sg,
  section: cg,
  sectionFlush: dg,
  head: ug,
  headLabel: hg,
  sample: mg,
  sampleLabel: wg,
  sampleTitle: _g,
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
}, $a = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Tg = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, Lg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ag = { notSimulated: "not simulated", running: "running" };
function Mg(e) {
  return e.presentation === "foundry";
}
function Ig(e, n) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = n.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function Eg(e, n) {
  var r;
  const a = Tg[e.status];
  return a !== void 0 ? a : ((r = n.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Bg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Pg(e, n) {
  if (n.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function jg(e) {
  if (Bg(e) && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Dg(e) {
  const [n, a] = v(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": n ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Og(e) {
  const n = Ag[e.kind];
  return n !== void 0 ? /* @__PURE__ */ t("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": n }) : /* @__PURE__ */ t(Ke, { size: 6, kind: Lg[e.kind], label: e.kind });
}
function qg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Hg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Fg(e) {
  const { step: n } = e;
  return /* @__PURE__ */ i(Dg, { kind: n.kind, children: [
    /* @__PURE__ */ t(Og, { kind: n.kind }),
    /* @__PURE__ */ i("span", { className: $.stepBody, "data-current": n.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: $.stepTitle, children: n.title }),
      /* @__PURE__ */ t(qg, { detail: n.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(Hg, { run: e.run, kind: n.kind, connection: e.connection })
  ] });
}
function zg(e, n) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return n !== void 0 && a.push(se(n)), a.join(" · ");
}
function Pr(e) {
  const n = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ t("p", { className: $.traceHead, id: n, children: zg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: $.steps, "aria-labelledby": n, children: e.steps.map((a, r) => /* @__PURE__ */ t(Fg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Wg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ t("p", { className: $.sampleLabel, children: "Sample item" }),
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
  const n = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + n + ". Nothing saved." });
}
function Gg(e) {
  const n = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? za(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: $.sectionFlush, children: /* @__PURE__ */ t(Zn, { divided: !0, cells: n }) });
}
function Ug(e) {
  const n = [];
  return e.cost !== void 0 && n.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && n.push({ value: za(e.turns[0], e.turns[1]), label: "Turns used" }), n;
}
function Vg(e) {
  const n = Ug(e.run);
  return n.length === 0 ? null : n.length === 1 ? /* @__PURE__ */ i("p", { className: $.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: n[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: n[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: $.sectionFlush, children: /* @__PURE__ */ t(Zn, { divided: !0, cells: n }) });
}
function jr(e) {
  const n = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("p", { className: `${$.reason} ward-checklist-note`, id: n, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: n })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Jg(e) {
  return /* @__PURE__ */ i("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ t(jr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: $.note, children: e.note })
  ] });
}
function Yg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ t(jr, { reason: e.reason, onPublish: e.onPublish }) });
}
function Dr(e) {
  return /* @__PURE__ */ i("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: $a[e.run.status].role, label: $a[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Xg(e, n) {
  const [a, r] = v(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((n == null ? void 0 : n.subscribe) === void 0 || e.status !== "running"))
      return n.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((l) => {
          var s, c;
          return [...l, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [n, e.status]), a;
}
function Qg(e) {
  var a;
  Pg(e.run, e.checklist);
  const n = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Dr, { run: e.run, foundry: !1, connection: n }),
    /* @__PURE__ */ t(Wg, { sample: e.run.sample }),
    /* @__PURE__ */ t(Pr, { run: e.run, steps: e.run.steps, connection: n, foundry: !1 }),
    /* @__PURE__ */ t(Gg, { run: e.run }),
    /* @__PURE__ */ t("div", { className: $.section, children: /* @__PURE__ */ t(tt, { items: e.checklist }) }),
    /* @__PURE__ */ t(Jg, { reason: Ig(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Zg(e) {
  var r;
  const n = Xg(e.run, e.feed);
  jg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Dr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ t(Kg, { sample: e.run.sample }),
    /* @__PURE__ */ t(Pr, { run: e.run, steps: n, connection: a, foundry: !0 }),
    /* @__PURE__ */ t(Vg, { run: e.run }),
    /* @__PURE__ */ t("div", { className: $.section, children: /* @__PURE__ */ t(tt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Yg, { reason: Eg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function $3(e) {
  return Mg(e) ? /* @__PURE__ */ t(Zg, { ...e }) : /* @__PURE__ */ t(Qg, { ...e });
}
const ey = "_list_142ip_3", ny = "_row_142ip_9", ty = "_condition_142ip_18", ay = "_action_142ip_24", Pn = {
  list: ey,
  row: ny,
  condition: ty,
  action: ay
}, Or = $e(!1);
function C3({ children: e, label: n = "Handoff rules" }) {
  return /* @__PURE__ */ t(Or.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: Pn.list, "aria-label": n, children: e }) });
}
function S3({ rule: e }) {
  if (!pe(Or)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: Pn.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Pn.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Pn.action, children: e.then })
  ] });
}
const ry = "_move_tmppt_3", oy = {
  move: ry
};
function gt(e, n, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(n, 1);
  return r.splice(a, 0, o), r;
}
function qr(e, n) {
  return n === "up" ? e - 1 : e + 1;
}
function Hr(e, n, a) {
  return `${e} moved to position ${n + 1} of ${a}.`;
}
function Ca(e, n, a) {
  return e.querySelector(`[data-move="${n}-${a}"]`);
}
function ly(e) {
  return e === "up" ? "down" : "up";
}
function iy(e, n) {
  const a = Ca(e, n.id, n.direction) ?? Ca(e, n.id, ly(n.direction));
  a == null || a.focus();
}
function Fr() {
  const e = f(null), [n, a] = v(null), [r, o] = v("");
  return S(() => {
    e.current !== null && n !== null && iy(e.current, n);
  }, [n]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function zr({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Fn({ id: e, name: n, direction: a, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${oy.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${n} ${a}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const sy = "_body_1jd1i_2", cy = "_title_1jd1i_8", dy = "_section_1jd1i_13", uy = "_legend_1jd1i_18", hy = "_stages_1jd1i_26", my = "_stage_1jd1i_26", wy = "_stageIndex_1jd1i_44", _y = "_stageName_1jd1i_50", fy = "_footer_1jd1i_59", vy = "_note_1jd1i_66", by = "_reason_1jd1i_71", py = "_actions_1jd1i_76", gy = "_webHead_1jd1i_83", yy = "_kicker_1jd1i_92", Ny = "_webTitle_1jd1i_99", ky = "_webBody_1jd1i_105", $y = "_webSection_1jd1i_109", Cy = "_sectionHead_1jd1i_121", Sy = "_sectionNote_1jd1i_129", Ry = "_formLabel_1jd1i_134", xy = "_identityRow_1jd1i_139", Ty = "_nameCell_1jd1i_145", Ly = "_keyCell_1jd1i_150", Ay = "_colourCell_1jd1i_154", My = "_colourStatus_1jd1i_161", Iy = "_webStages_1jd1i_166", Ey = "_webStageList_1jd1i_172", By = "_webStage_1jd1i_166", Py = "_webIndex_1jd1i_191", jy = "_webStageName_1jd1i_196", Dy = "_webMoves_1jd1i_201", Oy = "_addStage_1jd1i_215", qy = "_addStageButton_1jd1i_223", Hy = "_webFooter_1jd1i_236", Fy = "_webFooterNotes_1jd1i_244", zy = "_webNote_1jd1i_251", p = {
  body: sy,
  title: cy,
  section: dy,
  legend: uy,
  stages: hy,
  stage: my,
  stageIndex: wy,
  stageName: _y,
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
], Wr = "not a known stage";
function Ky(e, n) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(n) ? a : [{ value: n, label: `${n || "(unnamed)"} · ${Wr}` }, ...a];
}
function Gy({ stage: e, index: n, catalogue: a, onName: r }) {
  const o = `Stage ${n + 1} name`;
  if (!a) return /* @__PURE__ */ t(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const l = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Wr}`;
  return /* @__PURE__ */ t(E, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Ky(a, e.name), invalid: l, onChange: r });
}
function Kr(e, n) {
  return e.name || `stage ${n + 1}`;
}
function Uy(e) {
  const n = f([]), a = f(0);
  for (; n.current.length < e; ) n.current.push(`stage-row-${a.current++}`);
  return n.current.length > e && (n.current = n.current.slice(0, e)), n;
}
function Vy({ id: e, stage: n, index: a, total: r, catalogue: o, onReplace: l, onMove: s }) {
  const c = Kr(n, a), d = n.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ t("div", { className: p.webStageName, children: /* @__PURE__ */ t(Gy, { stage: n, index: a, catalogue: o, onName: (u) => l({ ...n, name: u }) }) }),
    /* @__PURE__ */ t(E, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: n.kind, options: Wy, onChange: (u) => l({ ...n, kind: u }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ t(Fn, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ t(Fn, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Jy({ stages: e, onChange: n, catalogue: a }) {
  const r = Uy(e.length), o = Fr(), l = (c, d) => {
    const u = qr(c, d);
    r.current = gt(r.current, c, u), o.moved({ id: r.current[u], direction: d }, Hr(Kr(e[c], c), u, e.length)), n(gt(e, c, u));
  }, s = (c, d) => n(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: o.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Vy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => l(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(zr, { text: o.announcement }),
    /* @__PURE__ */ t("p", { className: p.addStage, children: /* @__PURE__ */ t("button", { type: "button", className: p.addStageButton, onClick: () => n([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const Yy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function Xy({ stage: e }) {
  return e.gate && !kn(e.name, "Review") ? /* @__PURE__ */ t(m, { role: "gate", label: "Review" }) : null;
}
const Qy = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." }
], Gr = "Nothing runs until you publish.", Zy = "Add a name and a key.", eN = "At least 2 stages";
function Ht(e, n) {
  return !e.reserved && yn(e.step) && n[e.step] === void 0;
}
function nN(e, n) {
  const a = e.find((r) => Ht(r, n));
  return a ? a.step : 1;
}
function tN({ stages: e, onMove: n }) {
  const a = Fr(), r = (o, l) => {
    const s = qr(o, l);
    a.moved({ id: e[o].id, direction: l }, Hr(e[o].name, s, e.length)), n(o, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((o, l) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: p.stageIndex, children: String(l + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: p.stageName, children: o.name }),
      /* @__PURE__ */ t(Xy, { stage: o }),
      l > 0 && /* @__PURE__ */ t(Fn, { id: o.id, name: o.name, direction: "up", onMove: () => r(l, "up") }),
      l < e.length - 1 && /* @__PURE__ */ t(Fn, { id: o.id, name: o.name, direction: "down", onMove: () => r(l, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ t(zr, { text: a.announcement })
  ] });
}
function aN({ reason: e, onCreate: n, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ t("p", { className: p.note, children: Gr }),
    e && /* @__PURE__ */ t("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: n, children: "Create stream" })
    ] })
  ] });
}
function rN(e, n) {
  return e !== "" && n !== "" ? null : Zy;
}
function oN(e) {
  const { owners: n, ladder: a, takenBy: r = {}, policies: o = Qy, onCreate: l, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = v(""), [_, N] = v(""), [k, A] = v(n[0].value), [D, we] = v(() => nN(a, r)), [ae, Ce] = v(e.stages ?? Yy), [Qe, M] = v(o[0].value), V = { name: h, key: _, streamStep: D, owner: k, stages: ae, policy: Qe }, Se = rN(h, _);
  return /* @__PURE__ */ t(hn, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ t("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ t("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ t(E, { kind: "input", label: "Name", value: h, onChange: w }),
      /* @__PURE__ */ t(E, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ t(E, { kind: "select", label: "Owner", value: k, onChange: A, options: n })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ t("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ t(Br, { label: "Colour", steps: a, value: D, onChange: we, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ t("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ t(tN, { stages: ae, onMove: (Ge, Ro) => Ce(gt(ae, Ge, Ro)) })
    ] }),
    /* @__PURE__ */ t(kr, { legend: "When items move on", options: o, value: Qe, onChange: M }),
    /* @__PURE__ */ t(aN, { reason: Se, onCreate: () => l(V), onDraft: () => s(V) })
  ] }) });
}
const Ur = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
], lN = "Add a name, key, owner and two stages.";
function iN(e, n, a, r, o, l) {
  var c;
  const s = ((c = Ur.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: n, owner: a, colourStep: r, writePolicyMode: s, stages: l };
}
function sN(e, n) {
  return cN(e) && dN(e, n) && uN(e);
}
function cN(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function dN(e, n) {
  return e.colourStep === null || Ht({ step: e.colourStep }, n);
}
function uN(e) {
  return e.stages.length >= 2 && e.stages.every((n) => n.name.trim() !== "");
}
function hN(e, n) {
  if (e === null || Ht({ step: e }, n)) return "";
  const a = n[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function mN({ ready: e, draft: n, onCreate: a, onDraft: r, reasonId: o }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ t("p", { className: p.webNote, children: Gr }),
      !e && /* @__PURE__ */ t("p", { id: o, className: p.reason, children: lN })
    ] }),
    r && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => r(n), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => a(n), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: o, children: "Create stream" })
  ] });
}
function wN({ titleId: e }) {
  return /* @__PURE__ */ t("header", { className: p.webHead, children: /* @__PURE__ */ t("h2", { id: e, className: p.webTitle, children: "New stream" }) });
}
function _N({ name: e, setName: n, streamKey: a, setKey: r, colour: o, owner: l }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ t("h3", { className: p.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ t("div", { className: p.nameCell, children: /* @__PURE__ */ t(E, { variant: "form", label: "Name", value: e, onChange: n }) }),
      /* @__PURE__ */ t("div", { className: p.keyCell, children: /* @__PURE__ */ t(E, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    l
  ] });
}
function fN(e) {
  const n = y(), a = y(), r = e.takenBy ?? {}, [o, l] = v(""), [s, c] = v(""), [d, u] = v(e.owners[0] ?? ""), [h, w] = v(null), [_, N] = v("relay"), [k, A] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), D = iN(o, s, d, h, _, k), we = sN(D, r), ae = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ t("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Br, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ce = hN(h, r), Qe = /* @__PURE__ */ i(x, { children: [
    Ce && /* @__PURE__ */ t("p", { className: p.colourStatus, "data-colour-status": "", children: Ce }),
    /* @__PURE__ */ t(E, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((M) => ({ value: M, label: M })), onChange: u })
  ] });
  return /* @__PURE__ */ i(hn, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(wN, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ t(_N, { name: o, setName: l, streamKey: s, setKey: c, colour: ae, owner: Qe }),
      e.fields && /* @__PURE__ */ t("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: p.kicker, children: "Stages" }),
          /* @__PURE__ */ t("span", { className: p.sectionNote, children: eN })
        ] }),
        /* @__PURE__ */ t(Jy, { stages: k, onChange: A })
      ] }),
      /* @__PURE__ */ t("section", { className: p.webSection, children: /* @__PURE__ */ t(kr, { variant: "cards", legend: "How agents write", value: _, options: Ur, onChange: N }) }),
      /* @__PURE__ */ t(mN, { ready: we, draft: D, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: n })
    ] })
  ] });
}
function R3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(fN, { ...e }) : /* @__PURE__ */ t(oN, { ...e });
}
const vN = "_row_bs8hc_2", bN = "_cell_bs8hc_6", pN = "_condition_bs8hc_11", gN = "_action_bs8hc_18", yN = "_contract_bs8hc_24", NN = "_contractCondition_bs8hc_33", kN = "_contractAction_bs8hc_39", ee = {
  row: vN,
  cell: bN,
  condition: pN,
  action: gN,
  contract: yN,
  contractCondition: NN,
  contractAction: kN
}, Vr = ["advance", "block", "escalate", "requestReview"], Sa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function zn(e, n) {
  return (n == null ? void 0 : n.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ft(e, n, a, r) {
  return a || !n ? /* @__PURE__ */ t("span", { className: ee.action, children: Sa[e.then] }) : /* @__PURE__ */ t(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => n({ ...e, then: o }),
      options: Vr.map((o) => ({ value: o, label: Sa[o] }))
    }
  );
}
function $N({ rule: e, onChange: n, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t("span", { className: ee.condition, title: zn(e, r), children: zn(e, r) }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: Ft(e, n, a) })
  ] });
}
function CN({ rule: e, onChange: n, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: ee.condition, children: zn(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: Ft(e, n, a) })
  ] });
}
function SN({ rule: e, onChange: n, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ee.contractCondition, children: zn(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ee.contractAction, children: Ft(e, n, a, !0) })
  ] });
}
const RN = { two: CN, four: $N, contract: SN };
function x3(e) {
  var a;
  if (!Vr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const n = RN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(n, { ...e });
}
const xN = "_column_g1uat_2", TN = "_head_g1uat_17", LN = "_index_g1uat_23", AN = "_name_g1uat_29", MN = "_meta_g1uat_38", IN = "_mono_g1uat_43", EN = "_gate_g1uat_50", BN = "_reviewersLabel_g1uat_57", PN = "_reviewers_g1uat_57", jN = "_reviewer_g1uat_57", DN = "_agents_g1uat_74", ON = "_workflowColumn_g1uat_79", qN = "_workflowHead_g1uat_96", HN = "_stageRow_g1uat_102", FN = "_stageLabel_g1uat_109", zN = "_workflowTitle_g1uat_116", WN = "_workflowMeta_g1uat_122", KN = "_workflowGate_g1uat_127", GN = "_gateNote_g1uat_135", UN = "_cardNote_g1uat_140", VN = "_reviewerList_g1uat_145", JN = "_reviewerRow_g1uat_151", YN = "_reviewerMark_g1uat_157", XN = "_reviewerName_g1uat_167", QN = "_terminalCard_g1uat_173", ZN = "_terminalCount_g1uat_182", e1 = "_workflowAgents_g1uat_188", n1 = "_mount_g1uat_194", R = {
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
  mount: n1
}, Ra = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function zt(e, n = String) {
  return e === void 0 ? "—" : n(e);
}
function Jr(e) {
  return `${Math.round(e * 100)}%`;
}
function t1({ stage: e }) {
  const n = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: R.reviewers, children: n.map((a) => /* @__PURE__ */ t("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Zn, { cells: [
      { value: Jr(e.gateShare), label: "Held for review" },
      { value: te(e.count), label: "In stage" }
    ] })
  ] });
}
function a1({ stage: e }) {
  return /* @__PURE__ */ t(Zn, { cells: [
    { value: te(e.count), label: "In stage" },
    { value: zt(e.closedThisWeek, te), label: "Closed this week" }
  ] });
}
function r1({ stage: e, titleId: n }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ t("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: R.name, id: n, children: e.name }),
    kn(e.name, Ra[e.kind]) ? null : /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: Ra[e.kind] })
  ] });
}
function o1({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      te(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function l1({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(t1, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(a1, { stage: e }) : null;
}
function i1({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function s1({ stage: e, agents: n = [], onMount: a, feed: r }) {
  const o = y(), l = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(r1, { stage: e, titleId: o }),
    /* @__PURE__ */ t(o1, { stage: e }),
    /* @__PURE__ */ t(l1, { stage: e }),
    /* @__PURE__ */ t("div", { className: R.agents, children: n.map((s) => /* @__PURE__ */ t(pp, { ...s, connection: l }, s.agent.id)) }),
    /* @__PURE__ */ t(i1, { onMount: a })
  ] });
}
const c1 = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function d1({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: R.reviewerList, children: e.map((n, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: R.reviewerMark, "aria-hidden": "true", children: n.initials }),
    /* @__PURE__ */ t("span", { className: R.reviewerName, children: n.name })
  ] }, `${a}-${n.name}`)) });
}
function u1({ stage: e }) {
  const n = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: R.gateNote, children: n.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    n.length === 0 ? null : /* @__PURE__ */ t(d1, { reviewers: n }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Jr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function h1(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function m1({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: R.terminalCount, children: zt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: R.cardNote, children: h1(e.rolledBackThisWeek) })
  ] });
}
function w1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function _1(e) {
  if (e.kind === "terminal") return `${zt(e.closedThisWeek)} this week`;
  const n = w1(e.count);
  return e.medianWait === void 0 ? n : `${n} · median wait ${e.medianWait}`;
}
function f1({ stage: e, titleId: n }) {
  const a = c1[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${n}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || kn(e.name, a.label) ? null : /* @__PURE__ */ t(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: n, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: R.workflowMeta, children: _1(e) })
  ] });
}
function v1(e) {
  return e === "entry" || e === "agent";
}
function b1({ stage: e, onMount: n }) {
  return n === void 0 || !v1(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => n(e.index, a.currentTarget), children: "+ Add agent" });
}
function p1({ stage: e, agentCards: n, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(f1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(u1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(m1, { stage: e }) : null,
    n === void 0 ? null : /* @__PURE__ */ t("div", { className: R.workflowAgents, children: n }),
    /* @__PURE__ */ t(b1, { stage: e, onMount: a })
  ] });
}
function g1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function T3(e) {
  return g1(e) ? /* @__PURE__ */ t(p1, { ...e }) : /* @__PURE__ */ t(s1, { ...e });
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
function Yr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: n, metaKey: a, shiftKey: r, altKey: o, button: l } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: n, metaKey: a, shiftKey: r, altKey: o, button: l };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function W1(e) {
  const n = [`${e.live} live`];
  return e.draft > 0 && n.push(`${e.draft} draft`), e.paused > 0 && n.push(`${e.paused} paused`), n.join(" · ");
}
function K1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Xr(e) {
  return `${te(e)} ${e === 1 ? "member" : "members"}`;
}
function G1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Xr(e.members)}`;
}
function U1(e, n) {
  const a = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(n), "data-draft": a, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: G1(e) })
  ] }) });
}
function Qr({ name: e, gate: n, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    n ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...a, size: r, label: e }),
    n ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function V1(e, n, a) {
  if (e !== n) return { role: "soft" };
  const r = Qn(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function J1({ stages: e, streamStep: n }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, l) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ t(Qr, { name: o.name, gate: o.gate === !0, look: V1(l, a, n), size: "tag" }),
    l === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${l}`)) });
}
function Y1(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : J1(e) });
}
function Zr(e) {
  return e === void 0 ? void 0 : !0;
}
function xa(e, n, a, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Zr(r), children: e }),
    n === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: n })
  ] }) });
}
function X1(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Q1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Z1({ stream: e, href: n, presentation: a }) {
  const r = K1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Yr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ke(e.streamStep, "chip") }, children: [
    U1(e, n),
    Y1(e),
    xa(Q1(e.agents), e.agents === void 0 ? void 0 : W1(e.agents), "—"),
    X1(e.policy),
    xa(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function ek(e) {
  var n;
  return ((n = e.presentation) == null ? void 0 : n.columns) === 5;
}
function L3(e) {
  if (ek(e)) return Z1(e);
  const { stream: n, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Yr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: T(a), children: n.name }),
      /* @__PURE__ */ t(m, { ...It(n.key, n.streamStep) }),
      n.draft && /* @__PURE__ */ t(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: n.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Qr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ i("span", { className: g.mono, children: [
      n.agents.live,
      " live · ",
      n.agents.draft,
      " draft · ",
      n.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ t("span", { className: g.owner, children: n.owner }),
      /* @__PURE__ */ t("span", { className: g.mono, children: Xr(n.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: n.inFlightHint, "data-raised": Zr(n.inFlightHint), children: te(n.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: n.p50 === void 0 ? "" : se(n.p50) }) })
  ] });
}
const nk = "_row_2u4ll_2", tk = "_name_2u4ll_16", ak = "_scope_2u4ll_24", Wn = {
  row: nk,
  name: tk,
  scope: ak
};
function Wt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function rk(e) {
  return e === void 0 ? `${Wn.row} ward-toolrow` : `${Wn.row} ward-toolrow ${e}`;
}
function ok(e, n) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (n == null ? void 0 : n.lockedReasonFallback) ?? "Locked by stream policy" };
}
function lk({ id: e, reasonId: n, tool: a, state: r, onChange: o }) {
  return /* @__PURE__ */ t(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? n : void 0,
      onChange: (l) => {
        r.locked || o(l.target.checked);
      }
    }
  );
}
function ik({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: Wt(e) });
}
function sk({ tool: e, state: n, reasonId: a }) {
  const r = n.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: n.locked ? a : void 0, className: `${Wn.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ck(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function A3({ tool: e, onChange: n, presentation: a }) {
  const r = y(), o = y(), l = ok(e, a), s = ck(a);
  return /* @__PURE__ */ i(s, { className: rk(a == null ? void 0 : a.className), "data-locked": l.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(lk, { id: r, reasonId: o, tool: e, state: l, onChange: n }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Wn.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(sk, { tool: e, state: l, reasonId: o }),
    /* @__PURE__ */ t(ik, { classification: e.classification }),
    l.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const dk = "_strip_4ppv9_2", uk = "_well_4ppv9_11", hk = "_head_4ppv9_18", mk = "_name_4ppv9_24", wk = "_chart_4ppv9_32", _k = "_segment_4ppv9_38", fk = "_detailedChart_4ppv9_44", vk = "_rail_4ppv9_57", bk = "_section_4ppv9_63", pk = "_label_4ppv9_74", gk = "_note_4ppv9_91", ne = {
  strip: dk,
  well: uk,
  head: hk,
  name: mk,
  chart: wk,
  segment: _k,
  detailedChart: fk,
  rail: vk,
  section: bk,
  label: pk,
  note: gk
}, yk = "Nothing to preview.", yt = [1, 2, 3, 4, 5, 6], Kn = 100;
function Nk(e, n) {
  return n.has(e) ? ke(e, "id") : "var(--ward-color-line)";
}
function kk({ draft: e, streams: n }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...n.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ne.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: yt.map((r, o) => /* @__PURE__ */ t(
    "rect",
    {
      className: ne.segment,
      x: o * Kn,
      y: "0",
      width: Kn,
      height: "8",
      fill: Nk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function $k(e) {
  const n = e.slice(0, yt.length);
  for (; n.length < yt.length; ) n.push({ key: "—", name: "unclaimed", streamStep: null });
  return n;
}
function Ck({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${ne.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((n, a) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(a * Kn),
        y: "0",
        width: String(Kn),
        height: "40",
        style: { fill: ke(n.streamStep, "chip") }
      },
      n.key + String(a)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((n, a) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: n.name, children: n.key }, n.key + String(a))) })
  ] });
}
function eo(e) {
  return (n) => e == null ? void 0 : e(n);
}
function ct({ label: e, children: n }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: ne.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ t("h4", { id: a, className: ne.label, children: e }),
    n
  ] });
}
function Sk({ sample: e, sampleEmpty: n, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ne.note, children: n ?? yk }) : /* @__PURE__ */ t("div", { className: ne.well, children: /* @__PURE__ */ t(nt, { item: { ...e, streamStep: Qn(a.streamStep) }, onOpen: eo(r), feed: null }) });
}
function Rk({ draft: e }) {
  const n = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: ne.head, style: n, children: [
    /* @__PURE__ */ t(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ne.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...It(e.key, e.streamStep) })
  ] });
}
function xk(e) {
  const n = $k(e.identities ?? [e.draft, ...e.streams]), a = n[0];
  return /* @__PURE__ */ i("div", { className: ne.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ct, { label: "Board card", children: /* @__PURE__ */ t(Sk, { ...e, draft: a }) }),
    /* @__PURE__ */ t(ct, { label: "Streams index row", children: /* @__PURE__ */ t(Rk, { draft: a }) }),
    /* @__PURE__ */ t(ct, { label: "Overview chart segment", children: /* @__PURE__ */ t(Ck, { identities: n }) })
  ] });
}
function Tk({ draft: e, sample: n, streams: a, onOpen: r }) {
  const o = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: ne.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ i("div", { className: ne.head, children: [
      /* @__PURE__ */ t(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ne.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...It(e.key, e.streamStep) })
    ] }),
    n === void 0 ? null : /* @__PURE__ */ t("div", { className: ne.well, children: /* @__PURE__ */ t(nt, { item: { ...n, streamStep: e.streamStep }, onOpen: eo(r) }) }),
    /* @__PURE__ */ t(kk, { draft: e, streams: a })
  ] });
}
function M3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(xk, { ...e }) : /* @__PURE__ */ t(Tk, { ...e });
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
  cell: n,
  onChange: a
}) {
  return n.value === "byRole" ? /* @__PURE__ */ t("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: F.control, children: [
    /* @__PURE__ */ t(
      Xe,
      {
        label: `${e.name} · ${n.stream}`,
        checked: n.value !== "off",
        onChange: (r) => a(n.streamStep, r)
      }
    ),
    n.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "Pilot" })
  ] });
}
function Fk({ capability: e, cells: n, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    n.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Hk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function zk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Wk({ name: e, cell: n, onChange: a }) {
  if (n.value === "byRole") return /* @__PURE__ */ t("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Xe,
    {
      label: `${e} · step ${n.streamStep}`,
      checked: n.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(n.streamStep, o ? "on" : "off")
    }
  );
  return n.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Kk({ capability: e, cells: n, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    n.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Wk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webGoverned} ward-cellmeta`, children: zk(e) }) })
  ] });
}
function I3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Kk, { ...e }) : /* @__PURE__ */ t(Fk, { ...e });
}
const Gk = "_row_vv64h_2", Uk = "_cell_vv64h_6", Vk = "_name_vv64h_25", Jk = "_note_vv64h_30", Yk = "_webName_vv64h_41", Xk = "_webMeta_vv64h_47", Y = {
  row: Gk,
  cell: Uk,
  name: Vk,
  note: Jk,
  webName: Yk,
  webMeta: Xk
}, no = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Qk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Zk({ component: e, onRestart: n }) {
  const a = y(), r = no[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: Y.cell, "data-mono": "true", children: [
      te(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { id: a, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, "data-align": "end", children: o ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e.name), children: "Restart" }) })
  ] });
}
function e$({ component: e, onRestart: n }) {
  return n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e.name), children: Qk(e.state) });
}
function n$({ component: e, onRestart: n }) {
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { ...no[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(e$, { component: e, onRestart: n }) })
  ] });
}
function E3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(n$, { ...e }) : /* @__PURE__ */ t(Zk, { ...e });
}
const t$ = "_row_jcm5k_7", a$ = "_cell_jcm5k_11", r$ = "_next_jcm5k_28", o$ = "_headCell_jcm5k_38", l$ = "_webId_jcm5k_77", i$ = "_webPurpose_jcm5k_83", s$ = "_webMeta_jcm5k_91", c$ = "_webUrgent_jcm5k_97", W = {
  row: t$,
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
function en({ column: e, children: n }) {
  const a = h$[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: W.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: n
    }
  );
}
function B3() {
  return /* @__PURE__ */ t("tr", { children: to.map((e) => /* @__PURE__ */ t(
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
  const n = d$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ t(en, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(en, { column: "id", children: e.id }),
    /* @__PURE__ */ t(en, { column: "state", children: /* @__PURE__ */ t(m, { role: n.role, label: n.label }) }),
    /* @__PURE__ */ t(en, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: Wt(e.cls) }) }),
    /* @__PURE__ */ t(en, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(en, { column: "next", children: /* @__PURE__ */ t("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function w$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function _$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(w$, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(m, { ...u$[e.state] }) })
  ] });
}
function P3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(_$, { ...e }) : /* @__PURE__ */ t(m$, { ...e });
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
}, Ta = { dev: "Dev", uat: "UAT", prod: "Prod" }, ao = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function R$({ env: e }) {
  const n = ao[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: J.card, "aria-label": Ta[e.env], children: [
    /* @__PURE__ */ i("div", { className: J.head, children: [
      /* @__PURE__ */ t("span", { className: J.env, children: Ta[e.env] }),
      /* @__PURE__ */ t(m, { role: n.role, label: n.label })
    ] }),
    /* @__PURE__ */ t("p", { className: J.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: J.meta, children: [
      "deployed ",
      me(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ t("p", { className: J.meta, children: a })
  ] });
}
function x$(e) {
  const n = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), n, e.ticket].filter((a) => a !== null).join(" · ");
}
function T$(e) {
  return /* @__PURE__ */ i("article", { className: `${J.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${J.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${J.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...ao[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${J.version} ${J.webVersion} ${J.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${J.meta} ${J.webMeta} ${J.webLine} ward-cellmeta`, children: x$(e) })
  ] });
}
function j3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(T$, { ...e }) : /* @__PURE__ */ t(R$, { ...e });
}
const L$ = "_panel_1hmja_2", A$ = "_line_1hmja_8", M$ = "_actions_1hmja_14", xn = {
  panel: L$,
  line: A$,
  actions: M$
};
function D3(e) {
  return /* @__PURE__ */ i("div", { className: xn.panel, children: [
    /* @__PURE__ */ t("p", { className: xn.line, children: e.status }),
    /* @__PURE__ */ t(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: xn.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: xn.line, children: e.note ?? "" })
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
}, ro = 1.5, oo = 22, Gn = "script elements or event handlers", qe = "links or external references", Ie = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ro}px at ${oo}px`], F$ = [Ie[1], Ie[2], Gn, qe], z$ = /* @__PURE__ */ new Map([
  ["image", Ie[1]],
  ["text", Ie[2]],
  ["tspan", Ie[2]],
  ["textPath", Ie[2]],
  ["script", Gn],
  ["foreignObject", Gn],
  ["a", qe],
  ["use", qe],
  ["style", qe],
  ["feImage", qe],
  ["set", qe]
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
]), Kt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, V$ = /url\s*\(|['"\\]/i;
function J$() {
  return { ok: !1, reasons: [Ie[1]] };
}
function lo(e) {
  return e.namespaceURI === W$;
}
function Y$(e) {
  try {
    const n = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return n.localName === "svg" && lo(n) ? n : null;
  } catch {
    return null;
  }
}
function X$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ie[0]] : [];
}
function Q$(e) {
  return z$.get(e.localName) ?? (e.localName.startsWith("animate") ? qe : void 0);
}
function Z$(e) {
  return V$.test(e.replace(Kt, ""));
}
function e0(e) {
  return /^on/i.test(e.localName) ? Gn : e.localName === "href" || Z$(e.value) ? qe : void 0;
}
function n0(e) {
  const n = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    n.add(Q$(a));
    for (const r of Array.from(a.attributes)) n.add(e0(r));
  }
  return F$.filter((a) => n.has(a));
}
function t0(e) {
  const n = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...n.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? oo / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const l = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(l) && l * r < ro;
  }) ? [Ie[3]] : [];
}
function a0(e) {
  if (e.namespaceURI === K$) return !0;
  const n = e.localName;
  return e.namespaceURI === null && (U$.has(n) || n.startsWith("stroke"));
}
function r0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const n = e;
  return e.nodeType === Node.ELEMENT_NODE && lo(n) && G$.has(n.localName);
}
function o0(e, n) {
  r0(n) ? n.nodeType === Node.ELEMENT_NODE && io(n) : e.removeChild(n);
}
function io(e) {
  for (const n of Array.from(e.attributes)) a0(n) || e.removeAttributeNode(n);
  for (const n of Array.from(e.childNodes)) o0(e, n);
  return e;
}
function l0(e) {
  return Array.from(e.matchAll(Kt), (n) => n[2]).filter((n) => n !== "");
}
function i0(e) {
  let n = 2166136261;
  for (let a = 0; a < e.length; a += 1) n = Math.imul(n ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(n >>> 0).toString(36)}`;
}
function s0(e, n) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const l of l0(o.value)) a.has(l) || a.set(l, `${n}-${a.size}`);
  return a;
}
function c0(e, n) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Kt, (r, o, l) => {
      const s = n.get(l);
      return s === void 0 ? r : r.replace(`#${l}`, `#${s}`);
    });
}
function d0(e, n) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = s0(a, n);
  for (const o of a) {
    const l = r.get(o.getAttribute("id") ?? "");
    l === void 0 ? o.removeAttribute("id") : o.setAttribute("id", l), c0(o, r);
  }
  return e;
}
function O3(e) {
  const n = Y$(e);
  if (n === null) return J$();
  const a = [...X$(n), ...n0(n), ...t0(n)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(d0(io(n), i0(e))) };
}
const u0 = "Mark accepted.", h0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, m0 = new Set(Ka.flatMap((e) => [ke(e, "id"), ke(e, "chip")]));
function w0(e) {
  return e !== void 0 && (h0.test(e) || m0.has(e)) ? e : void 0;
}
function _0({ current: e }) {
  const n = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: re.preview, style: { "--mark": w0(e == null ? void 0 : e.colour) }, children: n ? /* @__PURE__ */ t("img", { className: re.mark, src: n, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: re.empty }) });
}
function f0(e, n) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return n.classNames[a];
}
function v0(e, n) {
  return e === null ? n.idle : e.ok ? n.accepted : n.rejected(e.reasons);
}
function b0({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: re.result, role: "status", children: /* @__PURE__ */ t("p", { className: re.accepted, children: u0 }) }) : /* @__PURE__ */ t("div", { className: re.result, role: "status", children: /* @__PURE__ */ t("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((n) => /* @__PURE__ */ t("li", { className: re.reason, children: n }, n)) }) });
}
function p0({ result: e, presentation: n }) {
  const a = n == null ? void 0 : n.status;
  return a === void 0 ? /* @__PURE__ */ t(b0, { result: e }) : /* @__PURE__ */ t("p", { className: `${re.result} ${f0(e, a)}`, role: "status", children: v0(e, a) });
}
function La(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function q3({ current: e, onUpload: n, onUseInitials: a, presentation: r, disabledReason: o }) {
  const l = f(null), [s, c] = v(null), d = (u) => {
    if (u === void 0) return;
    const h = n(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ t(_0, { current: e }),
    /* @__PURE__ */ i("div", { className: re.actions, children: [
      /* @__PURE__ */ t(
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
      /* @__PURE__ */ t(b, { ...La(o), onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...La(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(p0, { result: s, presentation: r })
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
}, Gt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, so = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], T0 = Object.fromEntries(so.map((e) => [e.key, e]));
function L0(e, n) {
  return `mcp.${e}.${n}`;
}
function A0(e) {
  return Object.keys(Gt).includes(e);
}
function M0(e) {
  return Gt[e !== void 0 && A0(e) ? e : "unknown"];
}
function mn({ column: e, children: n }) {
  const a = T0[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: O.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: n
    }
  );
}
function H3() {
  return /* @__PURE__ */ t("tr", { children: so.map((e) => /* @__PURE__ */ t(
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
  const n = Gt[e.connection];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i(mn, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: O.head, children: [
        /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: Wt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(mn, { column: "connection", children: /* @__PURE__ */ t(m, { role: n.role, label: n.label }) }),
    /* @__PURE__ */ t(mn, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(mn, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(mn, { column: "tools", children: e.tools.map((a) => L0(e.name, a)).join(" · ") })
  ] });
}
function E0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function B0(e) {
  var n;
  return (((n = e.write_tools) == null ? void 0 : n.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function P0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function j0({ server: e, onRestart: n }) {
  var a;
  return n === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e.name), children: "Restart server" });
}
function D0({ name: e, pinned: n, onPin: a }) {
  return n !== null || a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function O0({ server: e, onRestart: n, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: E0(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: o.map((l) => l.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(m, { ...B0(e) }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(P0, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(m, { ...M0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ t(j0, { server: e, onRestart: n }),
      /* @__PURE__ */ t(D0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function F3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(O0, { ...e }) : /* @__PURE__ */ t(I0, { ...e });
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
}, co = 104, uo = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function eC({ control: e, name: n, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Xe, { label: n, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(yr, { label: n, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ t("span", { className: j.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function nC({ setting: e, control: n, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), l = uo[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: j.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: j.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: o, className: j.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: j.cell, children: /* @__PURE__ */ t(eC, { control: n, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ t("td", { className: j.cell, style: { width: co }, children: /* @__PURE__ */ t(m, { role: l.role, label: l.label }) })
  ] });
}
function ho(e, n) {
  return String(e ?? n);
}
function tC(e, n) {
  return e.kind === "segment" && !n ? e.options : void 0;
}
function aC(e) {
  var a;
  const n = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (n == null ? void 0 : n.label) ?? ho(e.value, "—");
}
function rC({ control: e, name: n, locked: a, describedBy: r, onChange: o }) {
  const l = e.value === !0;
  return /* @__PURE__ */ i("span", { className: j.webControl, children: [
    /* @__PURE__ */ t(Xe, { label: n, labelHidden: !0, checked: l, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ t("span", { className: j.webState, "aria-hidden": "true", children: a || l ? "on" : "off" })
  ] });
}
function oC(e) {
  const { control: n, locked: a, onChange: r } = e;
  if (n.kind === "switch") return /* @__PURE__ */ t(rC, { ...e });
  const o = tC(n, a);
  return o !== void 0 ? /* @__PURE__ */ t("span", { className: j.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(yr, { options: o, value: ho(n.value, ""), onChange: (l) => r == null ? void 0 : r(l) }) }) : /* @__PURE__ */ t("span", { className: `${j.webControl} ${j.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: aC(n) });
}
function lC({ setting: e, control: n, inheritance: a, reason: r, onChange: o, renderControl: l }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${j.row} ${j.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: j.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${j.name} ${j.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${j.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    l ? /* @__PURE__ */ t("span", { className: j.webControl, children: l(s) }) : /* @__PURE__ */ t(oC, { control: n, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ t("span", { className: `${j.webChip} ward-policy-chip`, style: { width: co }, children: /* @__PURE__ */ t(m, { ...uo[a], size: "tag" }) })
  ] });
}
function z3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(lC, { ...e }) : /* @__PURE__ */ t(nC, { ...e });
}
const iC = "_label_1fzq1_7", sC = "_name_1fzq1_15", cC = "_column_1fzq1_24", dC = "_webFrame_1fzq1_57", uC = "_webHead_1fzq1_62", hC = "_webHeadLabel_1fzq1_74", mC = "_webLabel_1fzq1_118", wC = "_webColumns_1fzq1_125", _C = "_webGroup_1fzq1_131", fC = "_webPeople_1fzq1_132", vC = "_webVia_1fzq1_133", bC = "_webMeta_1fzq1_162", K = {
  label: iC,
  name: sC,
  column: cC,
  webFrame: dC,
  webHead: uC,
  webHeadLabel: hC,
  webLabel: mC,
  webColumns: wC,
  webGroup: _C,
  webPeople: fC,
  webVia: vC,
  webMeta: bC
}, pC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, dt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function ut({ column: e, children: n }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: K.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: n
    }
  );
}
function gC(e) {
  if (!e.matrixRole) return;
  const n = pC[e.matrixRole];
  if (!n) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return n;
}
function yC({ node: e }) {
  const n = gC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(NC, { role: n, node: e }),
    /* @__PURE__ */ t(ut, { column: dt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(ut, { column: dt[1], children: e.people === void 0 ? "" : te(e.people) }),
    /* @__PURE__ */ t(ut, { column: dt[2], children: e.requestedVia ?? "" })
  ] });
}
function NC({ role: e, node: n }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    n.floor && /* @__PURE__ */ t(m, { role: "soft", label: "Floor" }),
    n.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "Unresolved" })
  ] });
}
function kC({ index: e, depth: n, node: a, expanded: r, leaf: o, onToggle: l, children: s }) {
  return /* @__PURE__ */ t(
    xr,
    {
      index: e,
      depth: n,
      leaf: o,
      expanded: r,
      onToggle: l,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ t(yC, { node: a }),
      children: s
    }
  );
}
function ht({ className: e, text: n }) {
  return /* @__PURE__ */ t("span", { className: e, title: n, children: n });
}
function $C({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(ht, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(ht, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(ht, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function CC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ t("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function SC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "default" }) : null
  ] });
}
function RC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function xC({ rows: e, label: n }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(CC, {}),
    /* @__PURE__ */ t(v_, { label: n ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ t(
      xr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ t(SC, { row: a }),
        detail: /* @__PURE__ */ t($C, { row: a }),
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
function W3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xC, { ...e }) : /* @__PURE__ */ t(kC, { ...e });
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
}, mo = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function wo(e) {
  return String(e + 1).padStart(2, "0");
}
function zC({ step: e, index: n, connection: a }) {
  const r = mo[e.state], o = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: B.numeral, children: wo(n) }),
    /* @__PURE__ */ i("span", { className: B.body, children: [
      /* @__PURE__ */ i("span", { className: B.head, children: [
        /* @__PURE__ */ t("span", { className: B.title, children: e.title }),
        /* @__PURE__ */ t(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ t(Pe, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ t("span", { className: B.detail, children: e.detail })
    ] })
  ] });
}
function WC({ steps: e, actions: n, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ t("ol", { className: B.list, children: e.map((r, o) => /* @__PURE__ */ t(zC, { step: r, index: o, connection: a }, r.title)) }),
    n && /* @__PURE__ */ t("div", { className: B.actions, children: n })
  ] });
}
function KC({ step: e, index: n, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: wo(n) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...mo[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Pe, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function GC({ steps: e, actions: n, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ t(KC, { step: r, index: o, connection: a }, r.title)) }),
    n !== void 0 ? /* @__PURE__ */ t("span", { className: `${B.actions} ward-clarity-actions`, children: n }) : null
  ] });
}
function K3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(GC, { ...e }) : /* @__PURE__ */ t(WC, { ...e });
}
const UC = "_list_1gu6a_2", VC = "_check_1gu6a_10", JC = "_body_1gu6a_16", YC = "_text_1gu6a_23", XC = "_pending_1gu6a_32", QC = "_measured_1gu6a_37", an = {
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
  const n = ZC(e.passed);
  return /* @__PURE__ */ i("li", { className: `${an.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(jt, { state: n.state, label: n.label }),
    /* @__PURE__ */ i("span", { className: an.body, children: [
      /* @__PURE__ */ t("span", { className: an.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: an.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: an.measured, children: e.measured })
  ] });
}
function G3({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${an.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(eS, { check: n }, n.text)) });
}
const nS = "_root_y6bbq_2", tS = "_list_y6bbq_10", aS = "_line_y6bbq_32", rS = "_at_y6bbq_59", oS = "_text_y6bbq_63", lS = "_foot_y6bbq_67", iS = "_idle_y6bbq_79", sS = "_caret_y6bbq_87", cS = "_jump_y6bbq_94", ge = {
  root: nS,
  list: tS,
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
function Nt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : dS.format(new Date(e));
}
const uS = { warn: "warning", ok: "ok" };
function hS({ kind: e }) {
  const n = uS[e];
  return n === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function mS({ connection: e, idleSince: n, last: a }) {
  return e === "stale" ? /* @__PURE__ */ t("span", { className: ge.idle, children: `Quiet since ${Nt([n, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ t("span", { children: `Last event ${Nt(a.at)}` });
}
function wS({ connection: e, idleSince: n, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${ge.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${ge.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t(mS, { connection: e, idleSince: n, last: a }),
    r
  ] });
}
const _S = 8;
function fS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > _S;
}
function vS({ shown: e, onJump: n }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${ge.jump} ward-consjump`, onClick: n, children: "Jump to latest" }) : null;
}
const _o = $e(null);
function U3({ announce: e, onAnnounceChange: n, children: a }) {
  const [r, o] = v(!1), l = Oa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), n == null || n(s);
    }
  }), [e, r, n]);
  return /* @__PURE__ */ t(_o.Provider, { value: l, children: a });
}
function bS() {
  const e = pe(_o), [n, a] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [n, a];
}
const pS = (e, n) => ({ "data-empty": e === 0 || void 0, "data-fixed": n || void 0 });
function V3({ lines: e, connection: n, idleSince: a, label: r = "Activity", fixed: o }) {
  const l = f(null), [s, c] = v(0), [d, u] = bS(), [h, w] = v(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), sn(() => {
    const k = l.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var D;
    const k = l.current;
    if (!k) return;
    const A = k.querySelectorAll("[data-consline-text]");
    (D = A.item(A.length - 1)) == null || D.focus(), w(!1);
  };
  return /* @__PURE__ */ i("div", { className: ge.root, children: [
    /* @__PURE__ */ t("ol", { className: ge.list, ref: l, "aria-live": d ? "polite" : "off", "aria-label": r, ...pS(e.length, o), onScroll: (k) => w(fS(k.currentTarget)), children: e.map((k, A) => /* @__PURE__ */ i("li", { className: `${ge.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ t("span", { className: ge.at, children: Nt(k.at) }),
      /* @__PURE__ */ t(hS, { kind: k.kind }),
      /* @__PURE__ */ t("span", { className: ge.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${A}`)) }),
    /* @__PURE__ */ i(wS, { connection: n, idleSince: a, last: _, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${ge.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ t(vS, { shown: h, onJump: N })
    ] })
  ] });
}
const gS = "_row_1k8wl_2", yS = "_head_1k8wl_14", NS = "_author_1k8wl_20", kS = "_eta_1k8wl_25", $S = "_edited_1k8wl_26", CS = "_body_1k8wl_32", SS = "_reason_1k8wl_37", RS = "_actions_1k8wl_42", xe = {
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
function LS({ comment: e, reasonId: n, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: l }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: l, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function AS({ reason: e, reasonId: n }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: n, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: xe.reason, id: n, children: e })
  ] });
}
function MS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function IS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(LS, { ...e }) : /* @__PURE__ */ t(AS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function J3(e) {
  const { comment: n } = e;
  MS(e);
  const a = y(), r = `${a}-unavailable`, o = xS[n.delivery];
  return /* @__PURE__ */ i("div", { className: `${xe.row} ward-clarityrow`, "data-delivery": n.delivery, "data-queued": n.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: xe.head, children: [
      /* @__PURE__ */ t("span", { className: xe.author, children: n.author }),
      /* @__PURE__ */ t(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ t("span", { className: xe.eta, children: n.etaOrAttempt }),
      n.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: xe.edited, children: "edited " + n.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: xe.body, children: n.body }),
    /* @__PURE__ */ t("p", { className: xe.reason, id: a, children: TS(e.tracker ?? "Jira")[n.delivery] }),
    /* @__PURE__ */ t("div", { className: xe.actions, children: /* @__PURE__ */ t(IS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const ES = "_root_lxbd7_2", BS = "_attach_lxbd7_11", PS = "_actions_lxbd7_17", jS = "_reply_lxbd7_23", DS = "_replyField_lxbd7_28", OS = "_send_lxbd7_54", qS = "_sendIcon_lxbd7_65", Ye = {
  root: ES,
  attach: BS,
  actions: PS,
  reply: jS,
  replyField: DS,
  send: OS,
  sendIcon: qS
};
function fo({ value: e, onChange: n }) {
  const [a, r] = v("");
  return e === void 0 ? [a, r] : [e, n ?? (() => {
  })];
}
function HS() {
  return /* @__PURE__ */ t("svg", { className: Ye.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function FS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function zS(e) {
  const { placeholder: n, asUser: a, onPost: r } = e, [o, l] = fo(e), s = () => {
    o.trim() !== "" && r(a, o);
  }, c = (d) => {
    FS(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ t("div", { className: Ye.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Ye.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ t(E, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: n, label: n, value: o, onChange: l }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Ye.send, onClick: s, children: [
      /* @__PURE__ */ t(HS, {}),
      /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function Y3(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(zS, { ...e }) : /* @__PURE__ */ t(WS, { ...e });
}
function WS(e) {
  const { placeholder: n, asUser: a, attachTo: r, requeueAfter: o, onPost: l, onDraft: s } = e, [c, d] = fo(e);
  return /* @__PURE__ */ i("div", { className: Ye.root, children: [
    /* @__PURE__ */ t(E, { kind: "textarea", label: n, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Ye.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ t(
      er,
      {
        label: `Run ${o.agent} again after you post`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Ye.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const KS = "_list_1yhks_2", GS = "_item_1yhks_6", US = "_body_1yhks_22", VS = "_text_1yhks_28", JS = "_evidence_1yhks_37", YS = "_consequence_1yhks_49", on = {
  list: KS,
  item: GS,
  body: US,
  text: VS,
  evidence: JS,
  consequence: YS
};
function XS({ criterion: e }) {
  return /* @__PURE__ */ t(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Aa({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function QS({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: on.body, children: [
    /* @__PURE__ */ t("span", { className: on.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ t(Aa, { text: " · " }),
      /* @__PURE__ */ t("code", { className: on.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ t(Aa, { text: " · " }),
      /* @__PURE__ */ t("span", { className: on.consequence, children: e.why })
    ] })
  ] });
}
function ZS({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: on.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(XS, { criterion: e }),
    /* @__PURE__ */ t(QS, { criterion: e })
  ] });
}
function X3({ criteria: e }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("ul", { className: `${on.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(ZS, { criterion: n }, n.text)) }) });
}
const e2 = "_list_dwhoz_2", n2 = "_rung_dwhoz_6", t2 = "_name_dwhoz_18", a2 = "_actor_dwhoz_32", jn = {
  list: e2,
  rung: n2,
  name: t2,
  actor: a2
}, r2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function o2({ rung: e }) {
  const n = r2[e.state];
  return /* @__PURE__ */ i("li", { className: jn.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: jn.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: n.role, label: n.label }),
    /* @__PURE__ */ t("span", { className: `${jn.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Q3({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${jn.list} ward-gateladder`, children: e.map((n) => /* @__PURE__ */ t(o2, { rung: n }, n.name)) });
}
const l2 = "_sheet_pw37w_2", i2 = "_title_pw37w_9", s2 = "_stage_pw37w_15", c2 = "_effects_pw37w_20", d2 = "_effect_pw37w_20", u2 = "_numeral_pw37w_31", h2 = "_effectText_pw37w_38", m2 = "_refusals_pw37w_43", w2 = "_reasons_pw37w_52", _2 = "_reason_pw37w_52", f2 = "_actions_pw37w_62", _e = {
  sheet: l2,
  title: i2,
  stage: s2,
  effects: c2,
  effect: d2,
  numeral: u2,
  effectText: h2,
  refusals: m2,
  reasons: w2,
  reason: _2,
  actions: f2
};
function v2({ refused: e, reasonId: n, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: n, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function Z3({ run: e, effects: n, refusals: a, cost: r, onRequeue: o, onClose: l, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = v(""), w = a.length > 0;
  return /* @__PURE__ */ t(hn, { kind: "sheet", labelledBy: c, onClose: l, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: _e.sheet, children: [
    /* @__PURE__ */ i("h2", { className: _e.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: _e.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: _e.effects, children: n.map((_, N) => /* @__PURE__ */ i("li", { className: _e.effect, children: [
      /* @__PURE__ */ t("span", { className: _e.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _e.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ t(
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
    /* @__PURE__ */ t(E, { kind: "textarea", label: "Note", value: u, onChange: h }),
    w && /* @__PURE__ */ i("div", { className: _e.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: _e.reasons, children: a.map((_, N) => /* @__PURE__ */ t("li", { className: _e.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: _e.actions, children: [
      /* @__PURE__ */ t(v2, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ t(b, { onClick: l, children: "Cancel" })
    ] })
  ] }) });
}
const b2 = "_list_1laeg_2", p2 = "_path_1laeg_7", g2 = "_consequence_1laeg_35", kt = {
  list: b2,
  path: p2,
  consequence: g2
}, Ma = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function y2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ia(e) {
  return e ? "primary" : "secondary";
}
function N2({ path: e, primary: n, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Ia(n), size: "sm", onClick: () => a(e.kind), children: Ma[e.kind] }) : /* @__PURE__ */ t(b, { variant: Ia(n), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Ma[e.kind] });
}
function k2({ path: e, primary: n, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: kt.path, "data-allowed": e.allowed, "data-role": y2(e.requiredRole), children: [
    /* @__PURE__ */ t("span", { className: kt.consequence, children: e.consequence }),
    /* @__PURE__ */ t(N2, { path: e, primary: n, onChoose: a })
  ] });
}
function eA({ paths: e, onChoose: n }) {
  return /* @__PURE__ */ t("ul", { className: kt.list, children: e.map((a, r) => /* @__PURE__ */ t(k2, { path: a, primary: r === 0, onChoose: n }, a.kind)) });
}
const $2 = "_list_1m7i0_2", C2 = "_item_1m7i0_6", S2 = "_node_1m7i0_18", R2 = "_body_1m7i0_24", x2 = "_head_1m7i0_30", T2 = "_stage_1m7i0_36", L2 = "_version_1m7i0_41", A2 = "_sentence_1m7i0_49", M2 = "_meta_1m7i0_54", Le = {
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
  return /* @__PURE__ */ i("span", { className: Le.head, children: [
    /* @__PURE__ */ t("span", { className: Le.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Le.version, title: e.version, children: e.version }) : null
  ] });
}
function B2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Le.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Le.node} ward-history-node`, children: /* @__PURE__ */ t(Ke, { size: 9, kind: I2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Le.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(E2, { entry: e }),
      /* @__PURE__ */ t("span", { className: Le.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Le.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function nA({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Le.list} ward-history`, children: e.map((n, a) => /* @__PURE__ */ t(B2, { entry: n }, n.stage + String(a))) });
}
const P2 = "_thread_1dsr3_3", j2 = "_turn_1dsr3_8", D2 = "_who_1dsr3_27", O2 = "_body_1dsr3_32", q2 = "_working_1dsr3_75", H2 = "_dots_1dsr3_84", F2 = "_step_1dsr3_84", z2 = "_note_1dsr3_96", fe = {
  thread: P2,
  turn: j2,
  who: D2,
  body: O2,
  working: q2,
  dots: H2,
  step: F2,
  note: z2
}, Ut = $e(!1);
function tA({ children: e, density: n }) {
  return /* @__PURE__ */ t(Ut.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${fe.thread} ward-chat`, "aria-label": "Conversation", "data-density": n, children: e }) });
}
function aA({ turn: e }) {
  if (!pe(Ut)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${fe.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${fe.body} ward-chat-body`, children: e.body })
  ] });
}
function W2() {
  return /* @__PURE__ */ i("span", { className: fe.dots, "aria-hidden": "true", "data-dots": "true", children: [
    /* @__PURE__ */ t("span", { className: "ward-running" }),
    /* @__PURE__ */ t("span", { className: "ward-running" }),
    /* @__PURE__ */ t("span", { className: "ward-running" })
  ] });
}
function K2({ step: e, note: n }) {
  return /* @__PURE__ */ i("span", { role: "status", className: fe.step, children: [
    e === "" ? null : /* @__PURE__ */ t("span", { children: e }),
    n ? /* @__PURE__ */ t("span", { className: fe.note, children: n }) : null
  ] });
}
function rA({ author: e, step: n, body: a = "", note: r }) {
  if (!pe(Ut)) throw new Error("ChatWorking: must be rendered inside a Conversation");
  const o = a !== "";
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": "agent", "data-turn": "agent", "data-working": "true", children: [
    /* @__PURE__ */ t("span", { className: `${fe.who} ward-chat-who`, children: e }),
    /* @__PURE__ */ i("p", { className: `${fe.working} ward-chat-working`, children: [
      o ? null : /* @__PURE__ */ t(W2, {}),
      /* @__PURE__ */ t(K2, { step: n, note: r })
    ] }),
    o ? /* @__PURE__ */ t("p", { className: `${fe.body} ward-chat-body`, children: a }) : null
  ] });
}
const G2 = "_list_yiolt_3", U2 = "_row_yiolt_7", V2 = "_label_yiolt_20", J2 = "_n_yiolt_26", Y2 = "_cause_yiolt_33", bn = {
  list: G2,
  row: U2,
  label: V2,
  n: J2,
  cause: Y2
};
function X2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Q2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Z2({ row: e, formatNumber: n }) {
  return X2(e), /* @__PURE__ */ i("li", { className: `${bn.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Ke, { size: 8, ...Q2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: bn.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${bn.n} ward-stat-value`, children: n(e.n) }),
    /* @__PURE__ */ t(eR, { cause: e.cause })
  ] });
}
function eR({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${bn.cause} ward-healthrow-cause`, children: e }) : null;
}
function oA({ rows: e, formatNumber: n = te }) {
  return /* @__PURE__ */ t("ul", { className: `${bn.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Z2, { row: a, formatNumber: n }, a.label)) });
}
const nR = "_root_1jxwp_2", tR = {
  root: nR
};
function lA({ items: e, note: n, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: tR.root, "data-density": o, children: [
    /* @__PURE__ */ t(tt, { items: e, note: n, density: o }),
    /* @__PURE__ */ t(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const aR = "_row_dhbre_3", rR = "_key_dhbre_13", oR = "_stack_dhbre_24", lR = "_value_dhbre_32", iR = "_evidence_dhbre_39", sR = "_mark_dhbre_47", nn = {
  row: aR,
  key: rR,
  stack: oR,
  value: lR,
  evidence: iR,
  mark: sR
};
function cR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "Check" }) : /* @__PURE__ */ t(jt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function iA({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${nn.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${nn.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${nn.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${nn.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${nn.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${nn.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(cR, { state: e.state }) })
  ] });
}
const dR = "_cell_gh2sd_2", uR = {
  cell: dR
}, hR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function mR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function wR(e, n) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (n && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function _R(e, n) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: mR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[n] ?? "—";
}
function fR(e) {
  return e.map((n, a) => ({ ...n, id: n.id ?? String(a) }));
}
function sA({ rows: e, empty: n, requireNoRerunReason: a = !0 }) {
  wR(e, a);
  const r = fR(e);
  return /* @__PURE__ */ t(
    uw,
    {
      label: "Rejection rules",
      columns: hR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, l) => /* @__PURE__ */ t("span", { className: uR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: _R(o, l) }),
      empty: n ?? /* @__PURE__ */ t(af, { sentence: "No rejection rules yet." })
    }
  );
}
const vR = "_row_1f2re_2", bR = "_title_1f2re_12", pR = "_turns_1f2re_18", gR = "_waiting_1f2re_19", yR = "_resolved_1f2re_20", NR = "_activity_1f2re_21", kR = "_cost_1f2re_28", $R = "_link_1f2re_29", CR = "_tableLink_1f2re_47", SR = "_tableRecord_1f2re_48", RR = "_tableRow_1f2re_59", xR = "_tableTitle_1f2re_71", TR = "_tableResolved_1f2re_76", LR = "_tableMeta_1f2re_87", AR = "_tableCost_1f2re_94", MR = "_tableActivity_1f2re_95", IR = "_tableState_1f2re_105", H = {
  row: vR,
  title: bR,
  turns: pR,
  waiting: gR,
  resolved: yR,
  activity: NR,
  cost: kR,
  link: $R,
  tableLink: CR,
  tableRecord: SR,
  tableRow: RR,
  tableTitle: xR,
  tableResolved: TR,
  tableMeta: LR,
  tableCost: AR,
  tableActivity: MR,
  tableState: IR
}, vo = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function ER(e) {
  if (e === "") return "—";
  const n = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (n < 1) return "just now";
  if (n < 60) return `${n}m ago`;
  const a = Math.floor(n / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function BR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function PR(e) {
  const n = e.join(", ");
  return n === "" ? "—" : n;
}
const jR = { duplicate: "Closed · duplicate" };
function DR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(cn, { className: H.tableMeta, text: `waiting on ${e}` });
}
function OR({ value: e }) {
  return /* @__PURE__ */ t("td", { className: H.tableCost, children: e === void 0 ? null : oe(e) });
}
function qR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${H.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function HR({ session: e, href: n }) {
  const a = vo[e.state];
  return /* @__PURE__ */ i("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${H.tableLink} ward-target`, href: T(n), children: /* @__PURE__ */ t(cn, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: H.tableMeta, children: BR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: H.tableResolved, children: [
      PR(e.resolved),
      /* @__PURE__ */ t(DR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(OR, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: H.tableActivity, children: ER(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: H.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ t(m, { role: a.role, label: jR[e.state] ?? a.label }),
      /* @__PURE__ */ t(qR, { link: e.link })
    ] }) })
  ] });
}
function FR({ session: e }) {
  const n = vo[e.state];
  return /* @__PURE__ */ i("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(cn, { className: H.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(cn, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ t("span", { className: H.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: H.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: n.role, label: n.label })
  ] });
}
function cA(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(HR, { session: e.session, href: e.href }) : /* @__PURE__ */ t(FR, { session: e.session });
}
const zR = "_block_1yy2v_3", WR = "_list_1yy2v_9", KR = "_line_1yy2v_14", $t = {
  block: zR,
  list: WR,
  line: KR
}, GR = { warn: "warning", ok: "ok" };
function UR({ kind: e }) {
  const n = GR[e];
  return n === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function VR({ line: e }) {
  const n = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${$t.line} ward-typed-line ward-typed-line--${n}`, "data-kind": n, children: [
    /* @__PURE__ */ t(UR, { kind: n }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function dA({ lines: e, label: n = "Agent input" }) {
  return /* @__PURE__ */ t("div", { className: `${$t.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: $t.list, "aria-label": n, children: e.map((a, r) => /* @__PURE__ */ t(VR, { line: a }, `${r}-${a.text}`)) }) });
}
const JR = "_band_tt7hp_1", YR = "_head_tt7hp_8", XR = "_cell_tt7hp_19", QR = "_index_tt7hp_35", ZR = "_title_tt7hp_42", ex = "_note_tt7hp_48", nx = "_cellTitle_tt7hp_53", tx = "_cellBody_tt7hp_58", ax = "_tag_tt7hp_64", Re = {
  band: JR,
  head: YR,
  cell: XR,
  index: QR,
  title: ZR,
  note: ex,
  cellTitle: nx,
  cellBody: tx,
  tag: ax
}, Ea = 4;
function uA({ index: e, title: n, note: a, cells: r }) {
  if (r.length !== Ea)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Ea}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Re.band, "aria-label": `${e} ${n}`, children: [
    /* @__PURE__ */ i("div", { className: Re.head, children: [
      /* @__PURE__ */ t("span", { className: Re.index, children: e }),
      /* @__PURE__ */ t("span", { className: Re.title, children: n }),
      /* @__PURE__ */ t("span", { className: Re.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ i("div", { className: Re.cell, children: [
      /* @__PURE__ */ t("span", { className: Re.cellTitle, children: o.title }),
      /* @__PURE__ */ t("span", { className: Re.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ t("span", { className: Re.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const rx = "_tag_1yuvz_2", ox = "_link_1yuvz_14", mt = {
  tag: rx,
  link: ox
};
function bo({ label: e, href: n }) {
  return n === void 0 ? /* @__PURE__ */ t("span", { className: mt.tag, children: e }) : /* @__PURE__ */ t("a", { className: `${mt.tag} ${mt.link}`, href: T(n), children: e });
}
const lx = "_eyebrow_m8swv_2", ix = "_link_m8swv_10", Ba = {
  eyebrow: lx,
  link: ix
};
function at({ children: e, href: n }) {
  return /* @__PURE__ */ t("p", { className: Ba.eyebrow, children: n === void 0 ? e : /* @__PURE__ */ t("a", { className: `${Ba.link} ward-target`, href: T(n), children: e }) });
}
const sx = "_figure_qz9i7_2", cx = "_media_qz9i7_9", dx = "_caption_qz9i7_35", wt = {
  figure: sx,
  media: cx,
  caption: dx
};
function ux(e) {
  return e.src === void 0 ? /* @__PURE__ */ t(x, { children: e.children }) : /* @__PURE__ */ t("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Ct(e) {
  return /* @__PURE__ */ i("figure", { className: wt.figure, children: [
    /* @__PURE__ */ t("div", { className: wt.media, "data-ratio": e.ratio, children: /* @__PURE__ */ t(ux, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ t("figcaption", { className: wt.caption, children: e.caption })
  ] });
}
function $n(e) {
  return `h${e}`;
}
function hx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const mx = "_prose_1fxb9_2", wx = "_anchor_1fxb9_79", po = {
  prose: mx,
  anchor: wx
};
function St({ children: e }) {
  return /* @__PURE__ */ t("div", { className: po.prose, children: e });
}
function hA({ level: e, children: n, id: a }) {
  const r = $n(e), o = a ?? hx(n);
  return /* @__PURE__ */ i(r, { id: o, children: [
    n,
    " ",
    /* @__PURE__ */ t("a", { className: `${po.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${n}`, children: "#" })
  ] });
}
const _x = "_list_176jq_2", fx = "_pair_176jq_8", vx = "_term_176jq_14", bx = "_value_176jq_19", Tn = {
  list: _x,
  pair: fx,
  term: vx,
  value: bx
};
function px({ facts: e }) {
  return /* @__PURE__ */ t("dl", { className: Tn.list, children: e.map((n) => /* @__PURE__ */ i("div", { className: Tn.pair, children: [
    /* @__PURE__ */ t("dt", { className: Tn.term, children: n.term }),
    /* @__PURE__ */ t("dd", { className: Tn.value, children: n.value })
  ] }, n.term)) });
}
const gx = "_nav_sgeyg_2", yx = "_item_sgeyg_6", Nx = "_link_sgeyg_13", kx = "_note_sgeyg_30", Ln = {
  nav: gx,
  item: yx,
  link: Nx,
  note: kx
};
function $x({ label: e, links: n }) {
  return /* @__PURE__ */ t("nav", { "aria-label": e, className: Ln.nav, children: /* @__PURE__ */ t(ww, { children: n.map((a) => /* @__PURE__ */ i("li", { className: Ln.item, children: [
    /* @__PURE__ */ t("a", { className: `${Ln.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ t("span", { className: Ln.note, children: a.note })
  ] }, a.href)) }) });
}
const Cx = "_header_kelio_2", Sx = "_skip_kelio_14", Rx = "_brand_kelio_39", xx = "_list_kelio_46", Tx = "_link_kelio_56", tn = {
  header: Cx,
  skip: Sx,
  brand: Rx,
  list: xx,
  link: Tx
};
function mA({ brand: e, links: n, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: l = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: tn.header, children: [
    /* @__PURE__ */ t("a", { className: tn.skip, href: `#${o}`, children: l }),
    /* @__PURE__ */ t("a", { className: `${tn.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ t("nav", { "aria-label": "Main", className: tn.nav, children: /* @__PURE__ */ t("ul", { className: tn.list, role: "list", children: n.map((s) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: `${tn.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const Lx = "_footer_1jb5e_2", Ax = "_note_1jb5e_12", Mx = "_list_1jb5e_18", Ix = "_link_1jb5e_27", An = {
  footer: Lx,
  note: Ax,
  list: Mx,
  link: Ix
};
function wA({ note: e, links: n = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: An.footer, children: [
    /* @__PURE__ */ t("p", { className: An.note, children: e }),
    n.length === 0 ? null : /* @__PURE__ */ t("nav", { "aria-label": a, children: /* @__PURE__ */ t("ul", { className: An.list, role: "list", children: n.map((r) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: `${An.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const Ex = "_intro_13128_2", Bx = "_title_13128_9", Px = "_lead_13128_17", _t = {
  intro: Ex,
  title: Bx,
  lead: Px
};
function Vt({ title: e, eyebrow: n, eyebrowHref: a, lead: r, headingLevel: o = 1, children: l }) {
  const s = $n(o);
  return /* @__PURE__ */ i("header", { className: _t.intro, children: [
    n === void 0 ? null : /* @__PURE__ */ t(at, { href: a, children: n }),
    /* @__PURE__ */ t(s, { className: _t.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ t("p", { className: _t.lead, children: r }),
    l
  ] });
}
const jx = "_section_u0k7p_2", Dx = "_head_u0k7p_13", Ox = "_titles_u0k7p_21", qx = "_title_u0k7p_21", Hx = "_link_u0k7p_34", fn = {
  section: jx,
  head: Dx,
  titles: Ox,
  title: qx,
  link: Hx
};
function Fx({ title: e, headingId: n, eyebrow: a, link: r, headingLevel: o }) {
  const l = $n(o);
  return /* @__PURE__ */ i("div", { className: fn.head, children: [
    /* @__PURE__ */ i("div", { className: fn.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ t(at, { children: a }),
      /* @__PURE__ */ t(l, { className: fn.title, id: n, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ t("a", { className: `${fn.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function _A({ title: e, children: n, id: a, eyebrow: r, link: o, headingLevel: l = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: fn.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ t(Fx, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: l }),
    n
  ] });
}
const zx = "_split_1ycaa_2", Wx = "_main_1ycaa_10", Kx = "_aside_1ycaa_15", ft = {
  split: zx,
  main: Wx,
  aside: Kx
};
function Gx({ children: e, aside: n, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: ft.split, children: [
    /* @__PURE__ */ t("div", { className: ft.main, children: e }),
    /* @__PURE__ */ t("aside", { className: ft.aside, "aria-label": a, children: n })
  ] });
}
const Ux = "_hero_ehbct_2", Vx = "_text_ehbct_11", Jx = "_visual_ehbct_23", Yx = "_title_ehbct_28", Xx = "_lead_ehbct_36", Qx = "_actions_ehbct_42", Zx = "_action_ehbct_42", eT = "_primary_ehbct_63", nT = "_secondary_ehbct_72", Ee = {
  hero: Ux,
  text: Vx,
  visual: Jx,
  title: Yx,
  lead: Xx,
  actions: Qx,
  action: Zx,
  primary: eT,
  secondary: nT
};
function tT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ t("div", { className: Ee.actions, children: e.map((n, a) => /* @__PURE__ */ t("a", { className: `${Ee.action} ${a === 0 ? Ee.primary : Ee.secondary}`, href: T(n.href), children: n.label }, `${n.href}-${n.label}`)) });
}
function aT({ title: e, eyebrow: n, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ee.text, children: [
    n === void 0 ? null : /* @__PURE__ */ t(at, { children: n }),
    /* @__PURE__ */ t("h1", { className: Ee.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("p", { className: Ee.lead, children: a }),
    /* @__PURE__ */ t(tT, { actions: r })
  ] });
}
function fA({ visual: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: Ee.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ t(aT, { ...n }),
    e === void 0 ? null : /* @__PURE__ */ t("div", { className: Ee.visual, children: e })
  ] });
}
const rT = "_chain_w2k2l_2", oT = "_step_w2k2l_12", lT = "_arrow_w2k2l_19", iT = "_box_w2k2l_24", Mn = {
  chain: rT,
  step: oT,
  arrow: lT,
  box: iT
};
function vA({ steps: e, label: n, animate: a }) {
  return /* @__PURE__ */ t("ol", { className: Mn.chain, "aria-label": n, "data-ward-animate": a ?? "", children: e.map((r, o) => /* @__PURE__ */ i("li", { className: Mn.step, style: { "--ward-step": o }, children: [
    o === 0 ? null : /* @__PURE__ */ t("span", { className: Mn.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t("span", { className: Mn.box, children: r })
  ] }, o)) });
}
const sT = "_card_1u2gr_2", cT = "_featured_1u2gr_20", dT = "_media_1u2gr_28", uT = "_body_1u2gr_32", hT = "_title_1u2gr_48", mT = "_link_1u2gr_60", wT = "_summary_1u2gr_78", _T = "_tags_1u2gr_84", fT = "_cta_1u2gr_90", ve = {
  card: sT,
  featured: cT,
  media: dT,
  body: uT,
  title: hT,
  link: mT,
  summary: wT,
  tags: _T,
  cta: fT
};
function go({ media: e, ratio: n = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: ve.media, children: /* @__PURE__ */ t(Ct, { ratio: n, children: e }) });
}
function vT({ href: e, title: n, headingLevel: a = 3 }) {
  const r = $n(a);
  return /* @__PURE__ */ t(r, { className: ve.title, children: /* @__PURE__ */ t("a", { className: ve.link, href: T(e), children: n }) });
}
function yo({ eyebrow: e, ...n }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ t(at, { children: e }),
    /* @__PURE__ */ t(vT, { ...n })
  ] });
}
function No({ summary: e, tags: n = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ t("p", { className: ve.summary, children: e }),
    n.length === 0 ? null : /* @__PURE__ */ t("span", { className: ve.tags, children: n.map((a) => /* @__PURE__ */ t(bo, { label: a }, a)) })
  ] });
}
function bA({ media: e, ratio: n, eyebrow: a, summary: r, tags: o, ...l }) {
  return /* @__PURE__ */ i("article", { className: ve.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ t(go, { media: e, ratio: n }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ t(yo, { eyebrow: a, ...l }),
      /* @__PURE__ */ t(No, { summary: r, tags: o })
    ] })
  ] });
}
function pA({ media: e, ratio: n, eyebrow: a, summary: r, tags: o, cta: l, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${ve.card} ${ve.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ t(go, { media: e, ratio: n }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ t(yo, { eyebrow: a, ...s }),
      /* @__PURE__ */ t(No, { summary: r, tags: o }),
      l === void 0 ? null : /* @__PURE__ */ i("span", { className: ve.cta, "aria-hidden": "true", children: [
        l,
        " →"
      ] })
    ] })
  ] });
}
const bT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ko(e) {
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? e : `${n.getUTCDate()} ${bT[n.getUTCMonth()]} ${n.getUTCFullYear()}`;
}
const pT = "_row_1peme_2", gT = "_title_1peme_15", yT = "_link_1peme_23", NT = "_meta_1peme_40", kT = "_summary_1peme_46", wn = {
  row: pT,
  title: gT,
  link: yT,
  meta: NT,
  summary: kT
};
function gA({ href: e, title: n, date: a, meta: r, summary: o, headingLevel: l = 3 }) {
  const s = $n(l);
  return /* @__PURE__ */ i("article", { className: wn.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ t(s, { className: wn.title, children: /* @__PURE__ */ t("a", { className: wn.link, href: T(e), children: n }) }),
    /* @__PURE__ */ i("p", { className: wn.meta, children: [
      /* @__PURE__ */ t("time", { dateTime: a, children: ko(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    o === void 0 ? null : /* @__PURE__ */ t("p", { className: wn.summary, children: o })
  ] });
}
const $T = "_list_dd8kj_2", CT = "_item_dd8kj_16", Pa = {
  list: $T,
  item: CT
};
function yA({ children: e, rules: n = !1, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Pa.list, role: "list", "aria-label": a, "data-rules": n, children: Ha.toArray(e).map((r, o) => /* @__PURE__ */ t("li", { className: Pa.item, children: r }, o)) });
}
const ST = "_page_i3r2z_2", RT = "_aside_i3r2z_8", xT = "_tags_i3r2z_13", Jt = {
  page: ST,
  aside: RT,
  tags: xT
};
function TT({ labels: e }) {
  return /* @__PURE__ */ t("span", { className: Jt.tags, children: e.map((n) => /* @__PURE__ */ t(bo, { label: n }, n)) });
}
function LT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function AT(e) {
  return e.filter(LT).map(([n, a]) => ({
    term: n,
    value: typeof a == "string" ? a : /* @__PURE__ */ t(TT, { labels: a })
  }));
}
function MT({ facts: e, links: n, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Jt.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ t(px, { facts: e }),
    n === void 0 || n.length === 0 ? null : /* @__PURE__ */ t($x, { label: a, links: n })
  ] });
}
function $o({ facts: e, links: n = [], linksLabel: a, asideLabel: r, children: o }) {
  return e.length === 0 && n.length === 0 ? /* @__PURE__ */ t(St, { children: o }) : /* @__PURE__ */ t(Gx, { asideLabel: r, aside: /* @__PURE__ */ t(MT, { facts: e, links: n, linksLabel: a }), children: /* @__PURE__ */ t(St, { children: o }) });
}
function NA({ title: e, summary: n, children: a, eyebrow: r, eyebrowHref: o, role: l, period: s, focus: c, stack: d, related: u }) {
  const h = AT([
    ["Role", l],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Jt.page, children: [
    /* @__PURE__ */ t(Vt, { title: e, lead: n, eyebrow: r, eyebrowHref: o }),
    /* @__PURE__ */ t($o, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const IT = "_page_1junb_2", ET = "_source_1junb_8", BT = "_shots_1junb_30", Rt = {
  page: IT,
  source: ET,
  shots: BT
};
function PT({ shots: e, ratio: n }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ t(Ct, { ...e[0], ratio: n }) : /* @__PURE__ */ t("ul", { className: Rt.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(Ct, { ...a, ratio: n }) }, r)) });
}
function kA(e) {
  const { title: n, summary: a, children: r, source: o, facts: l = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: Rt.page, children: [
    /* @__PURE__ */ t(Vt, { title: n, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ t("a", { className: Rt.source, href: T(o.href), children: o.label }) }),
    /* @__PURE__ */ t(PT, { shots: s, ratio: c }),
    /* @__PURE__ */ t($o, { facts: l, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function jT(e) {
  const n = [], a = [];
  for (const r of e) {
    const o = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const l = a[a.length - 1];
    (l === void 0 ? n : l.children).push(o), a.push(o);
  }
  return n;
}
const DT = "_article_drsu4_2", OT = "_meta_drsu4_8", qT = "_tldr_drsu4_14", HT = "_tldrLabel_drsu4_21", FT = "_tldrText_drsu4_27", zT = "_toc_drsu4_40", WT = "_tocTitle_drsu4_44", KT = "_tocList_drsu4_50", GT = "_tocLink_drsu4_65", Be = {
  article: DT,
  meta: OT,
  tldr: qT,
  tldrLabel: HT,
  tldrText: FT,
  toc: zT,
  tocTitle: WT,
  tocList: KT,
  tocLink: GT
};
function UT({ date: e, minutes: n }) {
  return /* @__PURE__ */ i("p", { className: Be.meta, children: [
    /* @__PURE__ */ t("time", { dateTime: e, children: ko(e) }),
    n === void 0 ? null : ` · ${n} min read`
  ] });
}
function VT({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Be.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ t("p", { className: Be.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ t("div", { className: Be.tldrText, children: e })
  ] });
}
function Co({ nodes: e }) {
  return /* @__PURE__ */ t("ol", { className: Be.tocList, role: "list", children: e.map((n) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ t("a", { className: `${Be.tocLink} ward-target`, href: `#${n.id}`, children: n.text }),
    n.children.length === 0 ? null : /* @__PURE__ */ t(Co, { nodes: n.children })
  ] }, n.id)) });
}
function JT({ headings: e }) {
  const n = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Be.toc, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h2", { className: Be.tocTitle, id: n, children: "On this page" }),
    /* @__PURE__ */ t(Co, { nodes: jT(e) })
  ] });
}
function $A({ title: e, date: n, children: a, minutes: r, tldr: o, headings: l = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Be.article, children: [
    /* @__PURE__ */ t(Vt, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ t(UT, { date: n, minutes: r }) }),
    o === void 0 ? null : /* @__PURE__ */ t(VT, { children: o }),
    /* @__PURE__ */ t(JT, { headings: l }),
    /* @__PURE__ */ t(St, { children: a })
  ] });
}
const YT = 220;
function XT(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function CA(e) {
  return Math.max(1, Math.ceil(XT(e) / YT));
}
const Un = { w: 184, h: 96 }, dn = { w: 152, h: 48 }, Vn = 16, In = (e) => Math.round(e * 10) / 10;
function So(e) {
  return { x: Vn + e.col * Un.w, y: Vn + e.row * Un.h, w: dn.w, h: dn.h };
}
function QT(e) {
  const n = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Vn + n * Un.w + dn.w, h: 2 * Vn + a * Un.h + dn.h };
}
function ja(e, n, a) {
  return Math.min(e.w / 2 / Math.abs(n), e.h / 2 / Math.abs(a));
}
function ZT(e, n) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, o = n.x + n.w / 2 - a, l = n.y + n.h / 2 - r, s = ja(e, o, l), c = 1 - ja(n, o, l);
  return { x1: In(a + o * s), y1: In(r + l * s), x2: In(a + o * c), y2: In(r + l * c) };
}
function eL() {
  const [e, n] = v(!1);
  return S(() => {
    var o;
    const a = (o = window.matchMedia) == null ? void 0 : o.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (l) => n(l.matches);
    return n(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const nL = "_diagram_76e4t_2", tL = "_label_76e4t_9", aL = "_svg_76e4t_14", rL = "_node_76e4t_20", oL = "_edge_76e4t_33", lL = "_arrow_76e4t_38", iL = "_controls_76e4t_63", sL = "_live_76e4t_70", cL = "_steps_76e4t_77", Ae = {
  diagram: nL,
  label: tL,
  svg: aL,
  node: rL,
  edge: oL,
  arrow: lL,
  controls: iL,
  live: sL,
  steps: cL
};
function dL({ nodes: e, edges: n, lit: a, marker: r }) {
  const o = new Map(e.map((l) => [l.id, So(l)]));
  return n.map((l) => {
    const s = o.get(l.from), c = o.get(l.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(l.from) && a(l.to);
    return /* @__PURE__ */ t("line", { className: Ae.edge, "data-active": d, ...ZT(s, c), markerEnd: `url(#${r})` }, `${l.from}>${l.to}`);
  });
}
function uL({ nodes: e, lit: n }) {
  return e.map((a) => {
    const r = So(a);
    return /* @__PURE__ */ i("g", { className: Ae.node, "data-active": n(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ t("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ t("text", { x: r.x + dn.w / 2, y: r.y + dn.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Da({ label: e, to: n, count: a, go: r, status: o }) {
  return n < 0 || n >= a ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: o, children: e }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => r(n), children: e });
}
function hL({ at: e, count: n, text: a, go: r }) {
  const o = y();
  return /* @__PURE__ */ i("div", { className: Ae.controls, children: [
    /* @__PURE__ */ t(Da, { label: "Back", to: e - 1, count: n, go: r, status: o }),
    /* @__PURE__ */ t(Da, { label: "Next", to: e + 1, count: n, go: r, status: o }),
    /* @__PURE__ */ t("p", { className: Ae.live, id: o, "aria-live": "polite", children: `Step ${e + 1} of ${n}: ${a}` })
  ] });
}
function SA({ label: e, nodes: n, edges: a, steps: r }) {
  const o = eL() && r.length > 0, [l, s] = v(0), c = y(), d = (h) => o && r[l].nodes.includes(h), u = QT(n);
  return /* @__PURE__ */ i("figure", { className: Ae.diagram, "data-live": o, "aria-labelledby": c, children: [
    /* @__PURE__ */ t("figcaption", { className: Ae.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Ae.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ t("path", { className: Ae.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ t(dL, { nodes: n, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ t(uL, { nodes: n, lit: d })
    ] }),
    o ? /* @__PURE__ */ t(hL, { at: l, count: r.length, text: r[l].text, go: s }) : null,
    /* @__PURE__ */ t("ol", { className: Ae.steps, children: r.map((h, w) => /* @__PURE__ */ t("li", { "aria-current": o && w === l ? "step" : void 0, children: h.text }, w)) })
  ] });
}
export {
  kL as ACCENT_PRESETS,
  VL as ActionStack,
  V3 as ActivityConsole,
  AL as AdminIcon,
  pp as AgentCard,
  SA as AnimatedDiagram,
  IL as AppShell,
  M3 as AppearanceStrip,
  $A as Article,
  uA as Band,
  GL as BarChart,
  Of as BoardColumn,
  u3 as BoardFootnote,
  h3 as BoardHeader,
  TL as BoardIcon,
  t3 as BoardScroller,
  b as Btn,
  NL as CHIP_ROLES,
  to as CREDENTIAL_COLUMNS,
  zL as Callout,
  I3 as CapabilityRow,
  r3 as CardGrid,
  NA as CaseStudy,
  aA as ChatMessage,
  rA as ChatWorking,
  er as Checkbox,
  m as Chip,
  cn as ClampText,
  J3 as ClarificationRow,
  N3 as ClauseRuleRow,
  y3 as ClauseRules,
  Br as ColourLadder,
  E3 as ComponentRow,
  Y3 as Composer,
  w3 as ConfigRow,
  m3 as ConfigRowHead,
  Dt as ConnectionMark,
  U3 as ConsoleAnnounceProvider,
  tA as Conversation,
  Xm as CostMeter,
  P3 as CredentialRow,
  B3 as CredentialRowHead,
  X3 as CriteriaList,
  dc as Crumb,
  $L as DENSITIES,
  oA as DeliveryHealth,
  l3 as DeniedState,
  RL as DisabledScope,
  $3 as DryRunRail,
  af as EmptyState,
  j3 as EnvCard,
  at as Eyebrow,
  px as FactList,
  pA as FeaturedCard,
  E as Field,
  Ct as Figure,
  o3 as FilteredEmpty,
  vA as FlowChain,
  EL as FoldText,
  e3 as FormStack,
  tt as GateChecklist,
  Q3 as GateLadder,
  uw as Grid,
  S3 as HandoffRuleRow,
  C3 as HandoffRules,
  fA as Hero,
  xL as HomeIcon,
  WL as InfoTip,
  _3 as ItemDrawer,
  D3 as KeyPanel,
  Go as LIVE_EVENT_TYPES,
  Hb as LegacyBoardColumn,
  v3 as LegacyBoardHeader,
  b3 as LegacyConfigRow,
  g3 as LegacyItemDrawer,
  Eb as LegacyOverCapNote,
  p3 as LegacyPreviewRail,
  Mr as LegacyWorkCard,
  $x as LinkList,
  Pe as LiveIndicator,
  i3 as LoadFailed,
  d3 as Loading,
  so as MCP_SERVER_COLUMNS,
  jt as Mark,
  q3 as MarkUpload,
  Ke as Marker,
  F3 as McpServerRow,
  H3 as McpServerRowHead,
  wr as Menu,
  ur as MenuButton,
  R3 as NewStreamModal,
  sf as OverCapNote,
  Mt as OverflowRow,
  hn as Overlay,
  BL as OwedCard,
  k3 as PARTIAL_STEP_REASON,
  co as POLICY_CHIP_WIDTH,
  XL as PageFrame,
  FL as PageHeader,
  Vt as PageIntro,
  KL as PeriodPicker,
  ww as PlainList,
  z3 as PolicyRow,
  gA as PostRow,
  f3 as PreviewRail,
  bA as ProjectCard,
  kA as ProjectPage,
  St as Prose,
  hA as ProseHeading,
  dt as ROLE_MATRIX_COLUMNS,
  Vr as RULE_ACTIONS,
  kr as Radio,
  lA as ReadyChecklist,
  ZL as RecordSection,
  Z3 as RequeueSheet,
  eA as ResolveBlock,
  iA as ResolvedFieldRow,
  W3 as RoleMatrixRow,
  sA as RoutingTable,
  x3 as RuleRow,
  K3 as RunbookSteps,
  Ko as STREAM_STEPS,
  _A as Section,
  n3 as SectionBand,
  va as SectionHeader,
  yr as SegmentedControl,
  sr as Select,
  cA as SessionRow,
  OL as Sidebar,
  ML as SidebarFoldButton,
  wA as SiteFooter,
  mA as SiteHeader,
  Gx as SplitLayout,
  T3 as StageColumn,
  a3 as StageGrid,
  nA as StageHistory,
  Jy as StageListEditor,
  PL as StageSteps,
  s3 as StaleStrip,
  Zn as StatStrip,
  JL as StatTiles,
  HL as StreamAvatar,
  L3 as StreamRow,
  LL as StudioIcon,
  QL as SubjectRail,
  Xe as Switch,
  DL as TabLinks,
  UL as TableHead,
  jL as Tabs,
  bo as Tag,
  yA as TextList,
  bL as ThemeProvider,
  A3 as ToolRow,
  YL as TopBar,
  v_ as Tree,
  xr as TreeRow,
  dA as TypedInputBlock,
  Bi as UNSAFE_HREF,
  G3 as ValidationList,
  fL as VisibilityProvider,
  vL as Visible,
  yL as WARD_VERSION,
  nt as WorkCard,
  c3 as WriteUnavailableStrip,
  ER as agoSince,
  Mo as clock,
  hN as colourStatus,
  te as count,
  se as duration,
  xt as elapsed,
  gL as eventSourceTransport,
  ko as formatDate,
  $n as headingTag,
  Yn as isStreamStep,
  yn as isValidatedStreamStep,
  Vp as ladderValidation,
  M0 as mcpConnectionChip,
  L0 as mcpToolName,
  oe as money,
  ye as ms,
  Tr as ordered,
  za as ratio,
  CA as readTime,
  Qk as restartLabel,
  T as safeHref,
  hx as slug,
  me as stamp,
  Tt as stream,
  CL as streamChip,
  It as streamChipProps,
  ke as streamColour,
  Jo as streamHex,
  qn as streamInitials,
  Uo as streamVars,
  qL as uniqueStreamInitials,
  rr as useAnchoredPanel,
  En as useBorderFlash,
  je as useDisabledScope,
  Fo as useFocusTrap,
  SL as useLiveFeed,
  pL as useReturnFocus,
  Jn as useRovingTabindex,
  Lt as useTicker,
  Io as useVisible,
  P as v,
  O3 as validateMark,
  Qn as validatedStep,
  Ka as validatedStreamSteps,
  XT as wordCount
};
