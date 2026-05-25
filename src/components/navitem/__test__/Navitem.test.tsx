import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navitem, { NavItemProps } from "../Navitem";
import { describe, expect, it, vi } from "vitest";
import "jest-styled-components";

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} data-testid="mock-icon" />
);

const mockOnClickHandler = vi.fn();

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>,
  );
};

const defaultProps: NavItemProps = {
  navigateTo: "/home",
  text: "Home",
  Icon: MockIcon,
  className: "",
  isExpanded: true,
  isLinkActive: (path: string) => path === "/home",
  onClickHandler: mockOnClickHandler,
};

describe("Navitem component", () => {
  it("renders without crashing", () => {
    const { asFragment } = renderWithRouter(<Navitem {...defaultProps} />);
    expect(screen.getByTestId("Home")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with correct text", () => {
    const { asFragment } = renderWithRouter(<Navitem {...defaultProps} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders icon when provided", () => {
    const { asFragment } = renderWithRouter(<Navitem {...defaultProps} />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render icon when not provided", () => {
    const { asFragment } = renderWithRouter(
      <Navitem {...defaultProps} Icon={undefined} />,
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders expanded text when isExpanded is true", () => {
    const { asFragment } = renderWithRouter(<Navitem {...defaultProps} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render expanded text when isExpanded is false", async () => {
    const { asFragment } = renderWithRouter(
      <Navitem {...defaultProps} isExpanded={false} />,
    );
    const navText = screen.getByText("Home");
    expect(navText).toHaveStyle("visibility: hidden");
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies active styles when link is active", () => {
    const { asFragment } = renderWithRouter(<Navitem {...defaultProps} />, {
      route: "/home",
    });
    const navItemContainer = screen.getByTestId("Home").firstChild;
    expect(navItemContainer).toHaveStyleRule("border-left", "solid");
    expect(navItemContainer).toHaveStyleRule(
      "border-left-color",
      "var(--primary-200,#177ba6)",
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not apply active styles when link is not active", () => {
    const isLinkActiveMock = (path: string) => path !== "/home";
    const { asFragment } = renderWithRouter(
      <Navitem {...defaultProps} isLinkActive={isLinkActiveMock} />,
      {
        route: "/another-route",
      },
    );
    const navItemContainer = screen.getByTestId("Home").firstChild;
    expect(navItemContainer).not.toHaveStyleRule("border-left", "solid");
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies correct icon color when link is active", () => {
    const { asFragment } = renderWithRouter(<Navitem {...defaultProps} />, {
      route: "/home",
    });
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("stroke", "var(--primary-200, #177BA6)");
    expect(icon).toHaveAttribute("fill", "var(--primary-200, #177BA6)");
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies correct icon color when link is not active", () => {
    const isLinkActiveMock = (path: string) => path !== "/home";
    const { asFragment } = renderWithRouter(
      <Navitem {...defaultProps} isLinkActive={isLinkActiveMock} />,
      {
        route: "/another-route",
      },
    );
    const icon = screen.getByTestId("mock-icon");
    expect(icon).not.toHaveAttribute("stroke", "var(--primary-200, #177BA6)");
    expect(icon).not.toHaveAttribute("fill", "var(--primary-200, #177BA6)");
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls the onClickHandler when clicked", () => {
    renderWithRouter(<Navitem {...defaultProps} />);
    fireEvent.click(screen.getByTestId("Home-navlink"));
    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });
});
