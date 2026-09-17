import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { StageListEditor, type StageListRow } from "./StageListEditor";

const STAGES: StageListRow[] = [
  { name: "Intake", kind: "entry" },
  { name: "Extract", kind: "agent" },
  { name: "Review", kind: "gate" },
];

function Harness({ onChange }: { onChange: (rows: StageListRow[]) => void }) {
  const [stages, setStages] = useState(STAGES);
  return <StageListEditor stages={stages} onChange={(rows) => { onChange(rows); setStages(rows); }} />;
}

describe("StageListEditor", () => {
  it("moves a stage one place per press, announces its position and keeps focus on the moved row", () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    expect(screen.getByRole("list", { name: "Workflow stages in order" }).querySelectorAll("li")).toHaveLength(3);
    const up = screen.getByRole("button", { name: "Move Review up" });
    up.focus();
    fireEvent.click(up);
    expect(onChange).toHaveBeenLastCalledWith([
      { name: "Intake", kind: "entry" },
      { name: "Review", kind: "gate" },
      { name: "Extract", kind: "agent" },
    ]);
    expect(screen.getByRole("status").textContent).toBe("Review moved to position 2 of 3.");
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Move Review up");
    fireEvent.click(screen.getByRole("button", { name: "Move Review up" }));
    expect(onChange.mock.lastCall?.[0].map((row: StageListRow) => row.name)).toEqual(["Review", "Intake", "Extract"]);
    expect(screen.getByRole("status").textContent).toBe("Review moved to position 1 of 3.");
    expect(screen.queryByRole("button", { name: "Move Review up" })).toBeNull();
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Move Review down");
  });

  it("keeps typed names with their row after a reorder and adds agent stages", () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Move Intake down" }));
    expect((screen.getByLabelText("Stage 2 name") as HTMLInputElement).value).toBe("Intake");
    expect((screen.getByLabelText("Stage 1 name") as HTMLInputElement).value).toBe("Extract");
    fireEvent.click(screen.getByRole("button", { name: "+ Add stage" }));
    expect(onChange.mock.lastCall?.[0][3]).toEqual({ name: "", kind: "agent" });
  });
});
