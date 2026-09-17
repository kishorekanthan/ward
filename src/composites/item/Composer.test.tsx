import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Composer } from "./Composer";

describe("Composer", () => {
  it("keeps the labelled editor and Ward callback argument order", () => {
    const onPost = vi.fn();
    render(<Composer placeholder="Reply to the reviewer" asUser="P. Nayar" onPost={onPost} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Reply to the reviewer" }), {
      target: { value: "The contract is stable." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Post as P. Nayar" }));

    expect(onPost).toHaveBeenCalledWith("P. Nayar", "The contract is stable.");
  });

  it("keeps draft optional and renders a safe requeue checkbox without a callback", () => {
    render(
      <Composer
        placeholder="Reply"
        asUser="P. Nayar"
        requeueAfter={{ checked: false, agent: "reviewer v4" }}
        onPost={() => undefined}
      />,
    );

    expect(screen.queryByRole("button", { name: "Save draft" })).toBeNull();
    fireEvent.click(screen.getByRole("checkbox", { name: "Requeue reviewer v4 after posting" }));
  });

  const props = {
    placeholder: "Ask the agent a question",
    asUser: "M. Chen",
    onPost: () => {},
    onDraft: () => {},
  };

  it("names the actor on the post button", () => {
    render(<Composer {...props} />);
    expect(screen.getByText("Post as M. Chen")).not.toBeNull();
  });

  it("posts what was typed, as that actor", () => {
    const onPost = vi.fn();
    render(<Composer {...props} onPost={onPost} />);
    fireEvent.change(screen.getByLabelText("Ask the agent a question"), { target: { value: "Which window is late?" } });
    fireEvent.click(screen.getByText("Post as M. Chen"));
    expect(onPost).toHaveBeenCalledWith("M. Chen", "Which window is late?");
  });

  it("labels the box in visible text, never in a placeholder", () => {
    const { container } = render(<Composer {...props} />);
    const area = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(area.getAttribute("placeholder")).toBeNull();
    expect(container.querySelector(`label[for="${area.id}"]`)?.textContent).toBe("Ask the agent a question");
  });

  it("keeps the attachment a soft chip, not an action", () => {
    render(<Composer {...props} attachTo={{ label: "FL-229 · Triage", onChange: () => {} }} />);
    expect(screen.getByText("FL-229 · Triage").getAttribute("data-ward-chip")).toBe("soft");
  });

  it("offers the requeue only when the caller asks for it", () => {
    const onChange = vi.fn();
    const { rerender } = render(<Composer {...props} />);
    expect(screen.queryByRole("checkbox")).toBeNull();
    rerender(<Composer {...props} requeueAfter={{ checked: false, agent: "triage v2", onChange }} />);
    fireEvent.click(screen.getByLabelText("Requeue triage v2 after posting"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Composer reply row", () => {
  it("sends what was typed as the named actor and says who it sends as", () => {
    const onPost = vi.fn();
    render(<Composer variant="reply" placeholder="Reply, or go to review…" asUser="M. Chen" onPost={onPost} />);
    const box = screen.getByRole("textbox", { name: "Reply, or go to review…" });
    fireEvent.change(box, { target: { value: "Six hours covers it." } });
    const send = screen.getByRole("button", { name: "Send" });
    expect(send.getAttribute("aria-describedby")).toBe(box.getAttribute("aria-describedby"));
    expect(document.getElementById(send.getAttribute("aria-describedby") ?? "")?.textContent).toBe("Sends as M. Chen.");
    fireEvent.click(send);
    expect(onPost).toHaveBeenCalledWith("M. Chen", "Six hours covers it.");
  });
});
