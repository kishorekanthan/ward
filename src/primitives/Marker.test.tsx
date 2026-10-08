import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Marker } from "./Marker";

describe("Marker", () => {
  it("renders the closed size set as inline dimensions", () => {
    render(
      <>
        <Marker size={6} kind="green" />
        <Marker size={8} kind="stream" />
        <Marker size={9} kind="orange" />
        <Marker size={14} kind="blue" />
      </>,
    );
    const sizes = screen.getAllByTestId("marker").map((el) => el.style.width);
    expect(sizes).toEqual(["6px", "8px", "9px", "14px"]);
  });

  it("maps kinds to the token vars and stream to the injected --stream", () => {
    render(<Marker size={8} kind="stream" />);
    expect(screen.getByTestId("marker").style.getPropertyValue("--marker")).toBe("var(--stream)");
  });

  it("draws each hue kind from the role it stands for", () => {
    const kinds = ["green", "blue", "orange", "red", "amber", "greenFill", "orangeFill", "owed", "running"] as const;
    render(<>{kinds.map((kind) => <Marker key={kind} size={8} kind={kind} />)}</>);
    const roles = screen.getAllByTestId("marker").map((el) => el.style.getPropertyValue("--marker"));
    expect(roles).toEqual(["done", "running", "waiting", "danger", "waiting", "done", "waiting", "peach", "running"].map((r) => `var(--ward-color-${r})`));
  });

  // TRELLIS-422: only running work animates, so only the running kind carries the ward-running class.
  it("animates the running kind and no other", () => {
    render(
      <>
        <Marker size={8} kind="running" />
        <Marker size={8} kind="blue" />
        <Marker size={8} kind="owed" />
      </>,
    );
    expect(screen.getAllByTestId("marker").map((el) => el.classList.contains("ward-running"))).toEqual([true, false, false]);
  });

  it("is presentational unless a label is given", () => {
    render(
      <>
        <Marker size={6} kind="green" />
        <Marker size={6} kind="green" label="live" />
      </>,
    );
    const markers = screen.getAllByTestId("marker");
    expect(markers[0].getAttribute("aria-hidden")).toBe("true");
    expect(markers[1].getAttribute("role")).toBe("img");
    expect(markers[1].getAttribute("aria-label")).toBe("live");
  });
});
