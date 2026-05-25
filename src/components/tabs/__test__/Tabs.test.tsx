import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import Tabs from "../Tabs";
import { TabProps } from "../../tab/Tab";

describe("Tabs Component", () => {
  const onClickHandler = vi.fn();

  const tabProps: TabProps[] = [
    { title: "Tab 1", onClickHandler, active: true },
    { title: "Tab 2", onClickHandler },
    { title: "Tab 3", onClickHandler, disabled: true },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with correct number of tabs", () => {
    render(<Tabs tabs={tabProps} />);
    expect(screen.getAllByRole("button").length).toBe(tabProps.length);
  });

  it("applies custom class to container", () => {
    render(<Tabs tabs={tabProps} className="custom-class" />);
    const container = screen.getByTestId("tabs-container");
    expect(container).toHaveClass("custom-class");
  });

  it("applies custom class to each tab", () => {
    render(<Tabs tabs={tabProps} tabStyle="custom-tab-class" />);
    const tabElements = screen.getAllByRole("button");
    tabElements.forEach((tabElement) => {
      expect(tabElement).toHaveClass("custom-tab-class");
    });
  });

  it("renders each tab with the correct title", () => {
    render(<Tabs tabs={tabProps} />);
    tabProps.forEach((tab) => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  it("calls onClickHandler for enabled tabs when clicked", () => {
    render(<Tabs tabs={tabProps} />);
    const tabElements = screen.getAllByRole("button");

    fireEvent.click(tabElements[0]);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(tabElements[1]);
    expect(onClickHandler).toHaveBeenCalledTimes(2);

    fireEvent.click(tabElements[2]);
    expect(onClickHandler).toHaveBeenCalledTimes(2); // should not increment
  });

  it("applies disabled attribute correctly", () => {
    render(<Tabs tabs={tabProps} />);
    const tabElements = screen.getAllByRole("button");

    expect(tabElements[0]).not.toBeDisabled();
    expect(tabElements[1]).not.toBeDisabled();
    expect(tabElements[2]).toBeDisabled();
  });

  it("applies active styles to the active tab", () => {
    render(<Tabs tabs={tabProps} />);
    const activeTabElement = screen.getByText("Tab 1");

    expect(activeTabElement).toHaveStyleRule(
      "border-bottom",
      "2px solid var(--primary-200,#177ba6)",
    );
  });

  it("applies inactive styles to non-active tabs", () => {
    render(<Tabs tabs={tabProps} />);
    const inactiveTabElement = screen.getByText("Tab 2");

    expect(inactiveTabElement).toHaveStyleRule("border", "none");
  });
});
