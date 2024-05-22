import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Header from "../Header";
import { Button } from "../../button";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => (
    <Header style={{ border: "1px solid black" }}>
      <Header.Heading>Upload Documents</Header.Heading>
      <Header.Actions>
        <Button variant="secondary">Add to Catalog</Button>
        <Button variant="secondary">Cancel</Button>
      </Header.Actions>
      <Header.Breadcrumbs>Home {`  >  `} Upload Documents</Header.Breadcrumbs>
    </Header>
  ),
};

export const HeaderWithoutBreadcrumbs = () => (
  <Header>
    <Header.Heading>Upload Documents</Header.Heading>
    <Header.Actions>
      <Button variant="primary">View Comments</Button>
      <Button variant="negative">Close</Button>
    </Header.Actions>
  </Header>
);
