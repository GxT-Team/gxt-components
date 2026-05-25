import type { Meta, StoryObj } from "@storybook/react";
import React, { FC } from "react";
import { IconType } from "../../svg/SvgIcon";
import { BrowserRouter as Router } from "react-router-dom";

import Navitem from "../Navitem";
import SearchIcon from "../../../assets/icons/search.svg";

const withRouter = (Story) => (
  <Router>
    <Story />
  </Router>
);

const CustomIcon: FC<{
  iconType: IconType;
  size: number;
  className: string;
  stroke: string;
}> = ({ stroke }) => (
  <SearchIcon
    width={20}
    height={20}
    className="custom-icon"
    fill={stroke || "var(--neutral-200, #9CA3AF)"}
  />
);

const meta: Meta<typeof Navitem> = {
  title: "Navitem",
  component: Navitem,
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof Navitem>;

export const NavitemComponent: Story = {
  args: {
    navigateTo: "/",
    text: "Search",
    Icon: CustomIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    isExpanded: true,
    isLinkActive: () => false,
  },
};
