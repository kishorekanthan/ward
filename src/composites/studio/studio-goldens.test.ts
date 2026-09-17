import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const read = (...parts: string[]) => readFileSync(join(here, ...parts), "utf8");
const golden = JSON.parse(read("..", "..", "goldens", "studio.json")) as Record<string, Record<string, string>>;
const wardCss = read("..", "..", "ward.css");
const rootBlock = wardCss.slice(wardCss.indexOf(":root {"), wardCss.indexOf("}", wardCss.indexOf(":root {")));
const rootVars = new Map(Array.from(rootBlock.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));

// Tokens are substituted so the stylesheet is compared against the comp's literal values.
function value(file: string, selector: string, property: string): string {
  const source = read(...file.split("/"));
  const block = source.match(new RegExp(`(?:^|\\n)${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  const raw = block.match(new RegExp(`(?:^|[;\\s])${property}\\s*:\\s*([^;]+)`))?.[1].trim() ?? "";
  return raw.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole);
}

const font = (literal: string) => new RegExp(`^${literal},`);
const COLUMN = "StageColumn.module.css";
const CARD = "AgentCard.module.css";
const CHIP = "../../primitives/Chip.module.css";

describe("stream detail geometry against Studio 3c", () => {
  it("rules each stage column and lifts the gate column", () => {
    const { column } = golden;
    expect(value(COLUMN, "\\.workflowColumn", "padding")).toBe(column.padding);
    expect(value(COLUMN, "\\.workflowColumn", "gap")).toBe(column.gap);
    expect(value(COLUMN, "\\.workflowColumn", "border-right")).toBe(column.rule);
    expect(value(COLUMN, "\\.workflowColumn:last-child", "border-right")).toBe("0");
    expect(value(COLUMN, '\\.workflowColumn\\[data-kind="gate"\\]', "background")).toBe(column.gateGround);
  });

  it("stacks the stage label, name and count", () => {
    const { head } = golden;
    expect(value(COLUMN, "\\.workflowHead", "gap")).toBe(head.gap);
    expect(value(COLUMN, "\\.stageRow", "gap")).toBe(head.tagGap);
    expect(value(COLUMN, "\\.stageLabel", "font")).toMatch(font(head.label));
    expect(value(COLUMN, "\\.stageLabel", "letter-spacing")).toBe(head.labelTracking);
    expect(value(COLUMN, "\\.workflowTitle", "font")).toMatch(font(head.name));
    expect(value(COLUMN, "\\.workflowMeta", "font")).toMatch(font(head.count));
  });

  it("sets the small tag chip and its quiet ground", () => {
    const { tag } = golden;
    expect(value(CHIP, '\\.chip\\[data-size="tag"\\]', "font")).toMatch(font(tag.font));
    expect(value(CHIP, '\\.chip\\[data-size="tag"\\]', "letter-spacing")).toBe(tag.tracking);
    expect(value(CHIP, "\\.chip", "padding")).toBe(tag.padding);
    expect(rootVars.get("--ward-chip-quiet-bg")).toBe(tag.quietBg);
    expect(rootVars.get("--ward-chip-quiet-fg")).toBe(tag.quietFg);
  });

  it("builds the agent card with a stream square and a blue selected ring", () => {
    const { card } = golden;
    expect(value(CARD, "\\.card", "padding")).toBe(card.padding);
    expect(value(CARD, "\\.card", "gap")).toBe(card.gap);
    expect(value(CARD, "\\.mark", "width")).toBe(card.mark);
    expect(value(CARD, "\\.mark", "height")).toBe(card.mark);
    expect(value(CARD, "\\.head", "font")).toMatch(font(card.name));
    expect(value(CARD, "\\.description", "font")).toMatch(font(card.note));
    expect(value(CARD, "\\.chips", "gap")).toBe(card.tagGap);
    expect(value(CARD, '\\.card\\[data-selected="true"\\]', "background")).toBe(card.selectedGround);
    expect(value(CARD, '\\.card\\[data-selected="true"\\]', "box-shadow")).toBe(card.selectedRing);
  });

  it("draws the gate panel with reviewer squares", () => {
    const { gate } = golden;
    expect(value(COLUMN, "\\.workflowGate", "padding")).toBe(gate.padding);
    expect(value(COLUMN, "\\.workflowGate", "gap")).toBe(gate.gap);
    expect(value(COLUMN, "\\.workflowGate", "border")).toBe(gate.border);
    expect(value(COLUMN, "\\.gateNote", "font")).toMatch(font(gate.note));
    expect(value(COLUMN, "\\.reviewerList", "gap")).toBe(gate.listGap);
    expect(value(COLUMN, "\\.reviewerRow", "gap")).toBe(gate.rowGap);
    expect(value(COLUMN, "\\.reviewerMark", "width")).toBe(gate.mark);
    expect(value(COLUMN, "\\.reviewerMark", "font")).toMatch(font(gate.markType));
    expect(value(COLUMN, "\\.reviewerMark", "background")).toBe(gate.markGround);
    expect(value(COLUMN, "\\.reviewerName", "font")).toMatch(font(gate.reviewer));
  });

  it("sets the terminal counter and the mount link", () => {
    const { terminal, mount } = golden;
    expect(value(COLUMN, "\\.terminalCard", "padding")).toBe(terminal.padding);
    expect(value(COLUMN, "\\.terminalCard", "gap")).toBe(terminal.gap);
    expect(value(COLUMN, "\\.terminalCount", "font")).toMatch(font(terminal.count));
    expect(value(COLUMN, "\\.mount", "font")).toMatch(font(mount.font));
    expect(value(COLUMN, "\\.mount", "color")).toBe(mount.color);
  });
});

describe("streams index rows against Studio 3a", () => {
  const ROW = "StreamRow.module.css";
  const px = (literal: string) => Number.parseFloat(literal);

  it("pads each row to 15px 20px with an 8px gap between cells", () => {
    const { streamRow } = golden;
    const [block, inline] = value(ROW, "\\.compactCell", "padding").split(" ");
    expect(block).toBe(streamRow.padding.split(" ")[0]);
    expect(px(inline) * 2).toBe(px(streamRow.cellGap));
    expect(value(ROW, "\\.compactCell:first-child", "padding-left")).toBe(streamRow.padding.split(" ")[1]);
    expect(value(ROW, "\\.compactCell:last-child", "padding-right")).toBe(streamRow.padding.split(" ")[1]);
    expect(rootVars.get("--ward-width-streamIndent")).toBe(streamRow.workflowEnd);
  });

  it("stacks the identity, stats and stage chain", () => {
    const { streamRow } = golden;
    expect(value(ROW, "\\.stack", "gap")).toBe(streamRow.stack);
    expect(value(ROW, "\\.stat", "gap")).toBe(streamRow.statGap);
    expect(value(ROW, "\\.link", "gap")).toBe(streamRow.chainGap);
    expect(value(ROW, "\\.identityLine", "gap")).toBe(streamRow.cellGap);
    expect(value(ROW, "\\.ownerLine", "padding-left")).toBe(streamRow.ownerIndent);
  });

  it("sets the row type", () => {
    const { streamRow } = golden;
    expect(value(ROW, "\\.compactName", "font")).toMatch(font(streamRow.name));
    expect(value(ROW, "\\.ownerLine", "font")).toMatch(font(streamRow.owner));
    expect(value(ROW, "\\.statValue", "font")).toMatch(font(streamRow.value));
    expect(value(ROW, "\\.sub", "font")).toMatch(font(streamRow.sub));
    expect(value(ROW, "\\.policyId", "font")).toMatch(font(streamRow.policyId));
  });

  it("grounds a draft row and outlines its mark", () => {
    const { streamRow } = golden;
    expect(value(ROW, '\\.compactRow\\[data-draft="true"\\]', "background")).toBe(streamRow.draftGround);
    expect(value(ROW, '\\.identity\\[data-draft="true"\\]', "box-shadow")).toBe(streamRow.draftMark);
  });
});

describe("new stream modal against Studio 3b", () => {
  const MODAL = "NewStreamModal.module.css";
  const FIELD = "../../primitives/Field.module.css";
  const RADIO = "../../primitives/Radio.module.css";

  it("sets the header, title and ruled sections", () => {
    const { newStream } = golden;
    expect(value(MODAL, "\\.webHead", "padding")).toBe(newStream.headPadding);
    expect(value(MODAL, "\\.webHead", "gap")).toBe(newStream.headGap);
    expect(value(MODAL, "\\.webTitle", "font")).toMatch(font(newStream.title));
    expect(value(MODAL, "\\.webTitle", "letter-spacing")).toBe(newStream.titleTracking);
    expect(value(MODAL, "\\.webSection", "padding")).toBe(newStream.sectionPadding);
    expect(value(MODAL, "\\.webSection", "gap")).toBe(newStream.sectionGap);
    expect(value(MODAL, "\\.webSection:first-child", "padding-top")).toBe("0");
  });

  it("sizes the identity inputs and colour swatches", () => {
    const { newStream } = golden;
    expect(value(FIELD, '\\.field\\[data-variant="form"\\] \\.control', "padding")).toBe(newStream.inputPadding);
    expect(value(FIELD, '\\.field\\[data-variant="form"\\]', "gap")).toBe(newStream.labelGap);
    expect(value(MODAL, "\\.keyCell", "width")).toBe(newStream.keyWidth);
    expect(value("ColourLadder.module.css", "\\.swatch", "width")).toBe(newStream.swatch);
    expect(value("ColourLadder.module.css", "\\.swatches", "gap")).toBe(newStream.swatchGap);
  });

  it("lists the stages and rings the human gate", () => {
    const { newStream } = golden;
    expect(value(MODAL, "\\.webStageList", "gap")).toBe(newStream.stageList);
    expect(value(MODAL, "\\.webStage", "padding")).toBe(newStream.stagePadding);
    expect(value(MODAL, "\\.webStage", "gap")).toBe(newStream.stageGap);
    expect(value(MODAL, '\\.webStage\\[data-gate="true"\\]', "background")).toBe(newStream.gateGround);
    expect(value(MODAL, '\\.webStage\\[data-gate="true"\\]', "box-shadow")).toBe(newStream.gateRing);
  });

  it("pads the write-policy cards", () => {
    const { newStream } = golden;
    expect(value(RADIO, '\\.set\\[data-variant="cards"\\] \\.row', "padding")).toBe(newStream.cardPadding);
    expect(value(RADIO, '\\.set\\[data-variant="cards"\\]', "gap")).toBe(newStream.stageList);
    expect(value(RADIO, '\\.set\\[data-variant="cards"\\] \\.control', "gap")).toBe(newStream.cardGap);
  });
});

const CONFIG_ROW = "../board/ConfigRow.module.css";
const CHECKBOX = "../../primitives/Checkbox.module.css";
const RAIL = "../board/PreviewRail.module.css";
const HEADER = "../../primitives/SectionHeader.module.css";

describe("board configuration geometry against Studio 4a", () => {
  it("tints the gate row and sets the sub-line and state word", () => {
    const { boardConfig: c } = golden;
    expect(value(CONFIG_ROW, '\\.line\\[data-kind="gate"\\]', "background")).toBe(c.gateRowGround);
    expect(value(CONFIG_ROW, "\\.cName", "gap")).toBe(c.subGap);
    expect(value(CONFIG_ROW, "\\.sub", "font")).toMatch(font(c.sub));
    expect(value(CONFIG_ROW, "\\.cShown", "gap")).toBe(c.stateGap);
    expect(value(CONFIG_ROW, "\\.state", "font")).toMatch(font(c.state));
    expect(value(HEADER, '\\.root\\[data-kind="bare"\\] \\.counter', "font")).toMatch(font(c.counter));
  });

  it("draws each card field as an inset-ruled cell with a trailing sample", () => {
    const { boardConfig: c } = golden;
    const cell = '\\.root\\[data-variant="cell"\\]';
    expect(value(CHECKBOX, cell, "padding")).toBe(c.cellPadding);
    expect(value(CHECKBOX, cell, "box-shadow")).toBe(c.cellRing);
    expect(value(CHECKBOX, `${cell} \\.row`, "gap")).toBe(c.cellGap);
    expect(value(CHECKBOX, `${cell} \\.box`, "width")).toBe(c.cellBox);
    expect(value(CHECKBOX, `${cell} \\.label`, "font")).toMatch(font(c.cellLabel));
    expect(value(CHECKBOX, "\\.sample", "font")).toMatch(font(c.sample));
  });

  it("rules and pads the live preview rail", () => {
    const { boardConfig: c } = golden;
    expect(value(RAIL, "\\.rail", "border-left")).toBe(c.railRule);
    expect(value(RAIL, "\\.head", "padding")).toBe(c.railPadding);
    expect(value(RAIL, "\\.section", "padding")).toBe(c.railPadding);
    expect(value(RAIL, "\\.section", "gap")).toBe(c.railSectionGap);
    expect(value(RAIL, "\\.section:last-child", "gap")).toBe(c.effectsGap);
    expect(value(RAIL, "\\.note", "font")).toMatch(font(c.columnsNote));
    expect(value("GateChecklist.module.css", '\\.root\\[data-density="compact"\\] \\.text', "font")).toMatch(font(c.effectText));
  });

  it("outlines the skeleton columns and rings the gate", () => {
    const { boardConfig: c } = golden;
    expect(value(RAIL, "\\.skeleton", "gap")).toBe(c.skeletonGap);
    expect(value(RAIL, "\\.skeleton", "padding")).toBe(c.skeletonPadding);
    expect(value(RAIL, "\\.skeletonLabel", "font")).toMatch(font(c.skeletonLabel));
    expect(value(RAIL, "\\.bar", "height")).toBe(c.skeletonBar);
    expect(value(RAIL, "\\.bar", "background")).toBe(c.skeletonGround);
    expect(value(RAIL, '\\.skeleton\\[data-kind="gate"\\]', "box-shadow")).toBe(c.skeletonGateRing);
    expect(value(RAIL, '\\.skeleton\\[data-kind="gate"\\] \\.bar', "background")).toBe(c.skeletonGateBar);
  });
});
