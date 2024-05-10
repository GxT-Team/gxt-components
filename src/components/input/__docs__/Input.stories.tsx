import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";

const meta: Meta<typeof Example> = {
  title: "Input",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    inputType: "text",
    label: "",
    primary: true,
    disabled: false,
    size: "small",
    onChange: (e) => console.log(e.target.value),
  },
};
export const Label: Story = {
  args: {
    label: "This is a label",
    primary: false,
    disabled: false,
    size: "small",
    onChange: (e) => console.log(e.target.value),
  },
};
export const Password: Story = {
  args: {
    inputType: "password",
    label: "This is a label",
    primary: false,
    disabled: false,
    size: "small",
    onChange: (e) => console.log(e.target.value),
  },
};
export const Disabled: Story = {
  args: {
    label: "",
    primary: true,
    disabled: true,
    size: "small",
    onChange: (e) => console.log(e.target.value),
  },
};
