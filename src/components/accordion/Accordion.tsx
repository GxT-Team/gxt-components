import React, { ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Search } from "../search";
import { useSlots } from "../../hooks/useSlots";

import {
  AccordionContainer,
  AccordionIcon,
  Box,
  Content,
  Header,
  SearchBox,
} from "./accordion.styles";
import AccordionSvg from "../../assets/icons/accordion-icon.svg";

export interface AccordionProps {
  children: ReactNode;
  isSearchAble?: boolean;
  isAccordionOpen?: boolean;
  onChangeCallback?: (searchTerm: string) => void;
}

interface AccordionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  searchText?: string;
}

const AccordionHeader = function HeaderComponent({
  isOpen,
  children,
  onClick,
}: AccordionHeaderProps) {
  return (
    <Header onClick={onClick}>
      {children}
      <AccordionIcon $isOpen={!!isOpen}>
        <AccordionSvg fill={"var(--neutral-200, #9CA3AF)"} />
      </AccordionIcon>
    </Header>
  );
};

const AccordionContent = function ContentComponent({
  isOpen,
  children,
  searchText = "",
  ...rest
}: AccordionContentProps) {
  const filteredChildren = React.Children.toArray(children).filter(
    (child: any) => {
      return child.props?.label
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    },
  );

  return (
    <Content open={!!isOpen} {...rest}>
      {filteredChildren}
    </Content>
  );
};

const Accordion: React.FC<AccordionProps> & {
  Header: typeof AccordionHeader;
  Content: typeof AccordionContent;
} = ({
  children,
  isSearchAble = false,
  isAccordionOpen = true,
  onChangeCallback = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(isAccordionOpen);
  const [searchText, setSearchText] = useState("");

  const [{ HeaderSlot, ContentSlot }, restChildren] = useSlots(children, {
    HeaderSlot: AccordionHeader,
    ContentSlot: AccordionContent,
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchText(searchTerm);
    onChangeCallback(searchTerm);
  };

  useEffect(() => {
    setIsOpen(isAccordionOpen);
  }, [isAccordionOpen]);

  return (
    <AccordionContainer>
      {HeaderSlot && <HeaderSlot isOpen={isOpen} onClick={handleToggle} />}
      {ContentSlot && (
        <>
          <Box open={!!isOpen}>
            {isSearchAble && (
              <SearchBox>
                <Search
                  value={searchText}
                  onChangeCallback={handleSearchChange}
                  width="100%"
                  placeholder="Search options..."
                />
              </SearchBox>
            )}
          </Box>
          <ContentSlot isOpen={!!isOpen} searchText={searchText} />
        </>
      )}
      {restChildren}
    </AccordionContainer>
  );
};

Accordion.displayName = "Accordion";
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;

Accordion.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  isSearchAble: PropTypes.bool,
  isAccordionOpen: PropTypes.bool,
};
