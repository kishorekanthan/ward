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

  it("paints the fill kinds from the fill hues, not the ink hues", () => {
    render(
      <>
        <Marker size={8} kind="greenFill" />
        <Marker size={8} kind="orangeFill" />
      </>,
    );
    const fills = screen.getAllByTestId("marker").map((el) => el.style.getPropertyValue("--marker"));
    expect(fills).toEqual(["var(--ward-color-greenFill)", "var(--ward-color-orangeFill)"]);
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
