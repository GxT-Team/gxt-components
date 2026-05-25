import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "../Input";
import "jest-styled-components";

describe("Input component", () => {
  it("Input should render correctly", () => {
    render(<Input />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  it("Input should render label and input", () => {
    render(<Input label="Click me" />);
    const label = screen.getByTestId("label");
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("Input should be disabled", () => {
    render(<Input disabled />);
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
  });

  it("Input should render password", () => {
    render(<Input inputType="password" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("Input should apply custom styles to container", () => {
    const customStyles = {
      container: { backgroundColor: "rgb(211, 211, 211)" },
    };
    render(<Input customStyles={customStyles} />);
    const container = screen.getByTestId("input").parentElement;
    expect(container).toHaveStyle("background-color: rgb(211, 211, 211)");
  });

  it("Input should apply custom styles to label", () => {
    const customStyles = {
      label: { color: "rgb(255, 0, 0)" },
    };
    render(<Input label="Click me" customStyles={customStyles} />);
    const label = screen.getByTestId("label");
    expect(label).toHaveStyle("color: rgb(255, 0, 0)");
  });

  it("Input should apply custom styles to input", () => {
    const customStyles = {
      input: { borderColor: "blue" },
    };
    render(<Input customStyles={customStyles} />);
    const input = screen.getByTestId("input");
    expect(input).toHaveStyle("border-color: rgb(0, 0, 255)");
  });

  it("Input should render help text", () => {
    render(<Input helpText="This is help text" />);
    const helpText = screen.getByText("This is help text");
    expect(helpText).toBeInTheDocument();
  });

  it("Input should render error styles", () => {
    render(<Input error label="Error label" helpText="Error help text" />);
    const input = screen.getByTestId("input");
    const label = screen.getByTestId("label");
    const helpText = screen.getByText("Error help text");
    expect(input).toHaveStyleRule(
      "border",
      "1px solid var(--negative-200,#7f1d1d)",
    );
    expect(label).toHaveStyleRule("color", "var(--negative-200,#7F1D1D)");
    expect(helpText).toHaveStyleRule("color", "var(--negative-200,#7F1D1D)");
  });
});
