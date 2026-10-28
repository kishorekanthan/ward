import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { ruleBody } from "../../test-css";
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
    fireEvent.click(screen.getByRole("checkbox", { name: "Run reviewer v4 again after you post" }));
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
    fireEvent.click(screen.getByLabelText("Run triage v2 again after you post"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Composer reply row", () => {
  it("sends what was typed as the named actor with no sender line", () => {
    const onPost = vi.fn();
    render(<Composer variant="reply" placeholder="Reply, or go to review…" asUser="M. Chen" onPost={onPost} />);
    const box = screen.getByRole("textbox", { name: "Reply, or go to review…" });
    fireEvent.change(box, { target: { value: "Six hours covers it." } });
    const send = screen.getByRole("button", { name: "Send" });
    expect([send.getAttribute("aria-describedby"), box.getAttribute("aria-describedby")]).toEqual([null, null]);
    expect(document.body.textContent).not.toContain("Sends as");
    fireEvent.click(send);
    expect(onPost).toHaveBeenCalledWith("M. Chen", "Six hours covers it.");
  });
});

describe("Composer chat field", () => {
  const chat = { variant: "reply" as const, placeholder: "Ask the advisor", asUser: "M. Chen" };
  const css = (file: string) => fileURLToPath(new URL(file, import.meta.url));

  it("holds the text area and the send button in one field", () => {
    render(<Composer {...chat} onPost={() => {}} />);
    const field = screen.getByRole("textbox", { name: "Ask the advisor" }).closest("[data-ward-composer-field]");
    expect(screen.getByRole("textbox", { name: "Ask the advisor" }).tagName).toBe("TEXTAREA");
    expect(field?.contains(screen.getByRole("button", { name: "Send" }))).toBe(true);
  });

  it("names the icon button Send, hides its drawing and marks the field as the focus host", () => {
    render(<Composer {...chat} onPost={() => {}} />);
    const send = screen.getByRole("button", { name: "Send" });
    expect(send.closest("[data-ward-focus-host]")).toBe(screen.getByRole("textbox").closest("[data-ward-focus-host]"));
    expect(send.closest("[data-ward-focus-host]")).not.toBeNull();
    expect(send.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    expect(send.querySelector("svg")?.getAttribute("focusable")).toBe("false");
  });

  it("draws the send button as the sage main action with its name visually hidden", () => {
    render(<Composer {...chat} onPost={() => {}} />);
    const send = screen.getByRole("button", { name: "Send" });
    expect(send.classList.contains("ward-btn--primary")).toBe(true);
    expect(send.querySelector(".ward-visually-hidden")?.textContent).toBe("Send");
  });

  it("sends on Enter and keeps a new line on Shift+Enter and while composing", () => {
    const onPost = vi.fn();
    render(<Composer {...chat} onPost={onPost} />);
    const box = screen.getByRole("textbox", { name: "Ask the advisor" });
    fireEvent.change(box, { target: { value: "Who owns triage?" } });
    expect(fireEvent.keyDown(box, { key: "Enter", shiftKey: true })).toBe(true);
    expect(fireEvent.keyDown(box, { key: "Enter", isComposing: true })).toBe(true);
    expect(onPost).not.toHaveBeenCalled();
    expect(fireEvent.keyDown(box, { key: "Enter" })).toBe(false);
    expect(onPost).toHaveBeenCalledWith("M. Chen", "Who owns triage?");
  });

  it("sends nothing for a blank message", () => {
    const onPost = vi.fn();
    render(<Composer {...chat} value={"  \n "} onPost={onPost} />);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Ask the advisor" }), { key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onPost).not.toHaveBeenCalled();
  });

  it("starts at one line and grows to six, then scrolls", () => {
    render(<Composer {...chat} onPost={() => {}} />);
    expect(screen.getByRole("textbox", { name: "Ask the advisor" }).getAttribute("rows")).toBe("1");
    expect(ruleBody(css("../../primitives/Field.module.css"), '.field[data-variant="reply"] .area').split(";\n")).toEqual(
      expect.arrayContaining(["min-height: 1lh", "max-height: 6lh", "overflow-y: auto", "resize: none", "field-sizing: content"]),
    );
  });

  it("rings the whole rounded field on focus and draws no frame on the text", () => {
    const path = css("./Composer.module.css");
    expect(ruleBody(path, ".replyField")).toContain("border-radius: var(--ward-radius-panel)");
    expect(ruleBody(path, ".replyField:focus-within")).toBe("outline: var(--ward-focus-ring) solid var(--ward-color-focus);\noutline-offset: 0");
    expect(ruleBody(path, ".replyField textarea:focus-visible")).toBe("outline: none");
    expect(ruleBody(css("../../primitives/Field.module.css"), '.field[data-variant="reply"] .control')).toContain("box-shadow: none");
  });
});

describe("Composer with text the page owns", () => {
  const owned = { placeholder: "Ask the advisor", asUser: "M. Chen" };

  it("shows the page's text in both variants and reports typing", () => {
    const onChange = vi.fn();
    const { rerender } = render(<Composer {...owned} variant="reply" value="Which window is late?" onChange={onChange} onPost={() => {}} />);
    const box = screen.getByRole("textbox", { name: "Ask the advisor" }) as HTMLInputElement;
    expect(box.value).toBe("Which window is late?");
    fireEvent.change(box, { target: { value: "Which stage is late?" } });
    expect(onChange).toHaveBeenCalledWith("Which stage is late?");
    rerender(<Composer {...owned} value="Who owns triage?" onChange={onChange} onPost={() => {}} />);
    const area = screen.getByRole("textbox", { name: "Ask the advisor" }) as HTMLTextAreaElement;
    expect(area.value).toBe("Who owns triage?");
    fireEvent.change(area, { target: { value: "Who owns intake?" } });
    expect(onChange).toHaveBeenLastCalledWith("Who owns intake?");
  });

  it("keeps an empty page text as the page's, so a cleared box reports typing", () => {
    const onChange = vi.fn();
    render(<Composer {...owned} variant="reply" value="" onChange={onChange} onPost={() => {}} />);
    const box = screen.getByRole("textbox", { name: "Ask the advisor" }) as HTMLInputElement;
    fireEvent.change(box, { target: { value: "W" } });
    expect(onChange).toHaveBeenCalledWith("W");
    expect(box.value).toBe("");
  });

  it("sends the page's text from Send and from Post", () => {
    const onPost = vi.fn();
    const { rerender } = render(<Composer {...owned} variant="reply" value="Which window is late?" onPost={onPost} />);
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    rerender(<Composer {...owned} value="Who owns triage?" onPost={onPost} />);
    fireEvent.click(screen.getByRole("button", { name: "Post as M. Chen" }));
    expect(onPost.mock.calls).toEqual([["M. Chen", "Which window is late?"], ["M. Chen", "Who owns triage?"]]);
  });

  it("shows new text when the page fills the box from a suggestion", () => {
    function Page() {
      const [text, setText] = useState("");
      return (
        <>
          <button type="button" onClick={() => setText("Who owns triage?")}>Example</button>
          <Composer {...owned} variant="reply" value={text} onChange={setText} onPost={() => {}} />
        </>
      );
    }
    render(<Page />);
    const box = screen.getByRole("textbox", { name: "Ask the advisor" }) as HTMLInputElement;
    fireEvent.change(box, { target: { value: "draft" } });
    expect(box.value).toBe("draft");
    fireEvent.click(screen.getByRole("button", { name: "Example" }));
    expect(box.value).toBe("Who owns triage?");
  });
});
