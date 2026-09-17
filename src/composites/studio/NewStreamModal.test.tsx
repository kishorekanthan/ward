import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { stubMatchMedia } from "../../test-setup";
import type { LadderStep } from "./ColourLadder";
import { NewStreamModal, type NewStreamModalProps } from "./NewStreamModal";

const ladder = [{ step: 1 }, { step: 2 }, { step: 3 }];

describe("NewStreamModal", () => {
  it("keeps Ward's compact draft defaults and first free colour", () => {
    const onDraft = vi.fn();
    render(
      <NewStreamModal
        owners={[{ value: "priya", label: "Priya" }]}
        ladder={[{ step: 1, name: "Data" }, { step: 2, name: "Design" }]}
        takenBy={{ 1: "Data" }}
        onCreate={() => undefined}
        onDraft={onDraft}
        onClose={() => undefined}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
    expect(onDraft).toHaveBeenCalledWith({
      name: "",
      key: "",
      streamStep: 2,
      owner: "priya",
      stages: [
        { id: "intake", name: "Intake" },
        { id: "build", name: "In progress" },
        { id: "review", name: "Review", gate: true },
        { id: "done", name: "Done" },
      ],
      policy: "advance",
    });
  });

  it("uses the web presentation's explicit colour gate and exact payload", () => {
    const onCreate = vi.fn();
    render(
      <NewStreamModal presentation="web" owners={["Priya Nayar"]} ladder={ladder} takenBy={{ 1: "Data", 2: "Design" }} onCreate={onCreate} onClose={() => undefined} />,
    );
    expect((screen.getByRole("button", { name: "Create stream" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Integration" } });
    fireEvent.change(screen.getByLabelText("Key"), { target: { value: "INT" } });
    fireEvent.change(screen.getByLabelText("Stage 1 name"), { target: { value: "Triage" } });
    fireEvent.change(screen.getByLabelText("Stage 2 name"), { target: { value: "Map fields" } });
    expect((screen.getByRole("button", { name: "Create stream" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("radio", { name: "Step 3 — free" }));
    fireEvent.click(screen.getByRole("button", { name: "Create stream" }));
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate).toHaveBeenCalledWith({
      name: "Integration",
      key: "INT",
      owner: "Priya Nayar",
      colourStep: 3,
      writePolicyMode: "relay",
      stages: [{ name: "Triage", kind: "entry" }, { name: "Map fields", kind: "agent" }],
    });
  });

  it("refuses an unvalidated colour step and says which steps can be used", () => {
    const onCreate = vi.fn();
    const six = [{ step: 1 }, { step: 2 }, { step: 3 }, { step: 4 }, { step: 5 }, { step: 6 }, { step: 7, reserved: true }];
    const { container } = render(
      <NewStreamModal presentation="web" owners={["Priya Nayar"]} ladder={six} takenBy={{ 1: "Data" }} onCreate={onCreate} onClose={() => undefined} />,
    );
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Integration" } });
    fireEvent.change(screen.getByLabelText("Key"), { target: { value: "INT" } });
    fireEvent.change(screen.getByLabelText("Stage 1 name"), { target: { value: "Triage" } });
    fireEvent.change(screen.getByLabelText("Stage 2 name"), { target: { value: "Map fields" } });
    const status = () => container.ownerDocument.querySelector("[data-colour-status]")?.textContent;
    expect(status()).toBe("Colour: none picked — choose a free validated step; steps 4–6 are not validated — needs CVD matrix and dark stepping.");
    const partial = screen.getByRole("radio", { name: "Step 4 — not validated" });
    fireEvent.click(partial);
    expect(partial.getAttribute("aria-checked")).toBe("false");
    expect((screen.getByRole("button", { name: "Create stream" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("radio", { name: "Step 2 — free" }));
    expect(status()).toBe("Colour: step 2 — validated and free.");
    fireEvent.click(screen.getByRole("button", { name: "Create stream" }));
    expect(onCreate.mock.calls[0][0].colourStep).toBe(2);
  });

  it("names the reorder controls instead of dragging and announces compact moves", () => {
    render(
      <NewStreamModal owners={[{ value: "priya", label: "Priya" }]} ladder={[{ step: 1, name: "Data" }]} onCreate={() => undefined} onDraft={() => undefined} onClose={() => undefined} />,
    );
    expect(document.body.textContent).not.toMatch(/drag/i);
    fireEvent.click(screen.getByRole("button", { name: "Move Done up" }));
    expect(screen.getByRole("status").textContent).toBe("Done moved to position 3 of 4.");
  });

  it("portals the dialog to the body and removes it on unmount", () => {
    const { container, unmount } = render(
      <NewStreamModal presentation="web" owners={["Priya Nayar"]} ladder={ladder} onCreate={() => undefined} onClose={() => undefined} />,
    );
    const dialog = screen.getByRole("dialog");
    expect(container.contains(dialog)).toBe(false);
    expect(document.body.contains(dialog)).toBe(true);
    unmount();
    expect(document.body.querySelector("[role='dialog']")).toBeNull();
  });

  it("drops drag wording from the web stage section", () => {
    render(<NewStreamModal presentation="web" owners={["Priya Nayar"]} ladder={ladder} onCreate={() => undefined} onClose={() => undefined} />);
    expect(document.body.textContent).toContain("reorder with the ↑ ↓ buttons · min 2");
    expect(document.body.textContent).not.toMatch(/drag/i);
  });
});

const specLadder: LadderStep[] = [
  { step: 1, name: "Teal" },
  { step: 2, name: "Violet" },
  { step: 3, name: "Rust" },
  { step: 4, name: "Step 4", reserved: true },
];

const owners = [
  { value: "j.rao", label: "J. Rao" },
  { value: "m.chen", label: "M. Chen" },
];

function setup(overrides: Partial<NewStreamModalProps> = {}) {
  const onCreate = vi.fn();
  const onDraft = vi.fn();
  render(<NewStreamModal owners={owners} ladder={specLadder} onCreate={onCreate} onDraft={onDraft} onClose={() => {}} {...overrides} />);
  return { onCreate, onDraft, dialog: screen.getByRole("dialog") };
}

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

beforeEach(() => {
  stubMatchMedia(true);
});

afterEach(() => {
  stubMatchMedia(false);
});

describe("NewStreamModal (spec)", () => {
  it("offers colour only as ladder cells — no free swatch, and never the action blue", () => {
    const { dialog } = setup();
    const group = within(dialog).getByRole("radiogroup", { name: "Stream colour" });
    expect(within(group).getAllByRole("radio")).toHaveLength(specLadder.length);
    expect(dialog.querySelector('input[type="color"]')).toBeNull();
    expect(dialog.textContent).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(within(group).queryByRole("radio", { name: /0066F5|blue/i })).toBeNull();
  });

  it("groups every section as a fieldset with its own legend", () => {
    const { dialog } = setup();
    const sets = Array.from(dialog.querySelectorAll("fieldset"));
    expect(sets).toHaveLength(4);
    expect(sets.map((f) => f.querySelector("legend")?.textContent)).toEqual(["Identity", "Colour", "Stages", "Loop policy"]);
  });

  it("marks the gate stage with a word, not a tint alone", () => {
    setup();
    const row = screen.getByText("Review").closest("li") as HTMLElement;
    expect(row.getAttribute("data-gate")).toBe("true");
    expect(within(row).getByText("GATE")).not.toBeNull();
  });

  it("reorders stages and creates the stream in the order shown", () => {
    const { onCreate } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Move In progress down" }));
    expect(screen.getAllByRole("listitem").map((li) => li.children[1].textContent)).toEqual([
      "Intake",
      "Review",
      "In progress",
      "Done",
    ]);
    fill("Stream name", "Data engineering");
    fill("Key", "DE");
    fireEvent.click(screen.getByRole("button", { name: "Create stream" }));
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate.mock.calls[0][0].stages.map((st: { id: string }) => st.id)).toEqual(["intake", "review", "build", "done"]);
    expect(onCreate.mock.calls[0][0].streamStep).toBe(1);
  });

  it("carries each policy choice's consequence as its own body text", () => {
    setup();
    const choice = screen.getByLabelText("Block on a finding");
    const noteId = choice.getAttribute("aria-describedby") as string;
    expect(document.getElementById(noteId)?.textContent).toBe("One finding holds the item until a person resolves it.");
  });

  it("refuses to create an unnamed, unkeyed stream and says what is missing", () => {
    const { onCreate } = setup();
    const btn = screen.getByRole("button", { name: "Create stream" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(document.getElementById(btn.getAttribute("aria-describedby") as string)?.textContent).toBe(
      "Create is disabled: name the stream and give it a key first.",
    );
    fireEvent.click(btn);
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("keeps a taken colour off the initial choice and names its holder", () => {
    const { dialog } = setup({ takenBy: { 1: "front-end" } });
    const group = within(dialog).getByRole("radiogroup", { name: "Stream colour" });
    expect(within(group).getByRole("radio", { name: "Teal — taken by front-end" }).getAttribute("aria-checked")).toBe("false");
    expect(within(group).getByRole("radio", { name: "Violet — free" }).getAttribute("aria-checked")).toBe("true");
  });

  // The reorder announcer is keep-list; saving a draft must not speak through it.
  it("saves a draft without announcing anything in the dialog", () => {
    const { onDraft, dialog } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
    expect(onDraft).toHaveBeenCalledTimes(1);
    const live = Array.from(dialog.querySelectorAll("[aria-live]"));
    expect(live.map((node) => [node.getAttribute("role"), node.textContent])).toEqual([["status", ""]]);
  });
});
