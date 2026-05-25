import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import Tab from "../Tab";

describe("Tab Component", () => {
  const onClickHandler = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with title", () => {
    render(<Tab title="Tab 1" onClickHandler={onClickHandler} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("applies active styles when active is true", () => {
    render(<Tab title="Tab 1" active={true} onClickHandler={onClickHandler} />);
    const tabElement = screen.getByText("Tab 1");

    expect(tabElement).toHaveStyleRule("font-weight", "700");
    expect(tabElement).toHaveStyleRule(
      "border-bottom",
      "2px solid var(--primary-200,#177ba6)",
    );
  });

  it("applies inactive styles when active is false", () => {
    render(
      <Tab title="Tab 1" active={false} onClickHandler={onClickHandler} />,
    );
    const tabElement = screen.getByText("Tab 1");

    expect(tabElement).toHaveStyleRule("border", "none");
  });

  it("calls onClickHandler when clicked", () => {
    render(<Tab title="Tab 1" onClickHandler={onClickHandler} />);
    fireEvent.click(screen.getByText("Tab 1"));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  it("disables tab when disabled prop is true", () => {
    render(<Tab title="Tab 1" disabled onClickHandler={onClickHandler} />);
    const tabElement = screen.getByRole("button", { name: "Tab 1" });

    expect(tabElement).toBeDisabled();
    fireEvent.click(tabElement);
    expect(onClickHandler).not.toHaveBeenCalled();
  });

  it("applies custom class to tab", () => {
    render(
      <Tab
        title="Tab 1"
        onClickHandler={onClickHandler}
        className="custom-class"
      />,
    );
    const tabElement = screen.getByText("Tab 1");
    expect(tabElement).toHaveClass("custom-class");
  });
});
