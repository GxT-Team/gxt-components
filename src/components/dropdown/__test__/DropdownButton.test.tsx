import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import Dropdown, { DropDownOption } from "../Dropdown";

describe("Dropdown component", () => {
  const options: DropDownOption<string>[] = [
    {
      value: "Option 1",
    },
    {
      value: "Option 2",
    },
    {
      value: "Option 3",
    },
  ];
  const onSelect = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with select type", () => {
    render(
      <Dropdown
        type="select"
        options={options}
        onSelect={onSelect}
        placeholder="Select an option"
        position="bottom"
      />,
    );

    fireEvent.click(screen.getByText("Select an option"));

    options.forEach((option) => {
      expect(screen.getByText(option.value)).toBeInTheDocument();
    });
  });

  it("renders correctly with button type", () => {
    render(
      <Dropdown
        type="button"
        options={options}
        placeholder="Select an option"
        position="bottom"
      />,
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("calls onSelect when an option is selected", () => {
    render(
      <Dropdown
        type="select"
        options={options}
        onSelect={onSelect}
        placeholder="Select an option"
        position="bottom"
      />,
    );

    fireEvent.click(screen.getByText("Select an option"));

    fireEvent.click(screen.getByText("Option 2"));

    expect(onSelect).toHaveBeenCalledWith({
      value: "Option 2",
    });
  });

  it("disables button when disabled prop is true", () => {
    render(
      <Dropdown
        type="button"
        options={options}
        placeholder="Select an option"
        disabled={true}
        position="bottom"
      />,
    );

    const button = screen.getByText("Select an option").parentElement;
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toBeDisabled();
  });

  it("renders label correctly", () => {
    render(
      <Dropdown
        type="button"
        options={options}
        label="Dropdown Label"
        placeholder="Select an option"
        position="bottom"
      />,
    );

    expect(screen.getByText("Dropdown Label")).toBeInTheDocument();
  });

  it("applies custom styles to container", () => {
    const customStyles = {
      container: { backgroundColor: "rgb(211, 211, 211)" },
    };
    render(
      <Dropdown
        type="button"
        options={options}
        placeholder="Select an option"
        customStyles={customStyles}
        position="bottom"
      />,
    );

    const container =
      screen.getByText("Select an option").parentElement?.parentElement;
    expect(container).toHaveStyle("background-color: rgb(211, 211, 211)");
  });

  it("applies custom styles to label", () => {
    const customStyles = {
      label: { color: "rgb(255, 0, 0)" },
    };
    render(
      <Dropdown
        type="button"
        options={options}
        label="Dropdown Label"
        placeholder="Select an option"
        customStyles={customStyles}
        position="bottom"
      />,
    );

    const label = screen.getByText("Dropdown Label");
    expect(label).toHaveStyle("color: rgb(255, 0, 0)");
  });

  it("applies custom styles to button", () => {
    const customStyles = {
      button: { borderColor: "blue" },
    };
    render(
      <Dropdown
        type="button"
        options={options}
        placeholder="Select an option"
        customStyles={customStyles}
        position="bottom"
      />,
    );

    const button = screen.getByText("Select an option").parentElement;
    expect(button).toHaveStyle("border-color: rgb(0, 0, 255)");
  });

  it("applies custom styles to placeholder", () => {
    const customStyles = {
      placeholder: { color: "rgb(0, 128, 0)" },
    };
    render(
      <Dropdown
        type="button"
        options={options}
        placeholder="Select an option"
        customStyles={customStyles}
        position="bottom"
      />,
    );

    const placeholder = screen.getByText("Select an option");
    expect(placeholder).toHaveStyle("color: rgb(0, 128, 0)");
  });

  it("should render divided menu", () => {
    render(
      <Dropdown
        type="button"
        placeholder="Select an option"
        position="bottom"
        menuType="divided"
        groupedOptions={[
          {
            header: "Upload",
            options: [
              { value: "Upload CSV" },
              { value: "Upload DOCX" },
              { value: "Upload PDF" },
            ],
          },
          {
            header: "Download",
            options: [
              { value: "Download CSV" },
              { value: "Download DOCX" },
              { value: "Download PDF" },
            ],
          },
          {
            header: "",
            options: [{ value: "Close" }],
          },
        ]}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Select an option",
    });

    fireEvent.click(button);

    expect(screen.getByText("Upload")).toHaveStyle("font-weight: 700");
    expect(screen.getByText("Upload CSV")).toBeInTheDocument();
    expect(screen.getByText("Download")).toHaveStyle("font-weight: 700");
    expect(screen.getAllByTestId("divider")).toHaveLength(2);
  });

  it("sets initial value correctly without placeholder", () => {
    render(
      <Dropdown
        type="select"
        options={options}
        onSelect={onSelect}
        initialValue={{ value: "Option 2" }}
        position="bottom"
      />,
    );

    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
