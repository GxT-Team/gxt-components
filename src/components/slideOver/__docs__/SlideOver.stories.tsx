import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SlideOver from "../SlideOver";
import Button from "../../button/Button";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof SlideOver> = {
  title: "SlideOver",
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleClose = () => {
      updateArgs({ isOpen: false });
    };

    const handleOpen = () => {
      updateArgs({ isOpen: true });
    };

    return (
      <>
        <Button onClick={handleOpen}>Open SlideOver</Button>
        <SlideOver {...args} isOpen={isOpen} onClose={handleClose}>
          <SlideOver.Header key="1">Header text</SlideOver.Header>
          <h1>SlideOver</h1>
          <SlideOver.Footer key="2">
            <Button onClick={handleClose}>Close</Button>
          </SlideOver.Footer>
        </SlideOver>
      </>
    );
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SlideOver>;

export const SlideOverComponent: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log("closed"),
    position: "right",
    overlay: true,
    width: "250px",
    overlayClasses: "",
    contentClasses: "",
    slideOverClasses: "",
    slideOverStyles: {},
    contentStyles: {},
    overlayStyles: {},
    children: [],
    dataTestId: "test-slideover",
  },
};
