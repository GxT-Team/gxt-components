import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";
import {
  CustomSelectButton,
  DropdownContainer,
  IconWrapper,
  SelectHeaderItemWrapper,
  SelectItemsWrapper,
  SelectItemWrapper,
  SelectWrapper,
  StyledChevronDownIcon,
  StyledLabel,
} from "./DropdownStyledComponents";
import { Divider } from "../divider";

type DropdownType = "select" | "button";
type DropdownMenuType = "simple" | "divided";

export const Position = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
  Center: "center",
} as const;

export type PositionType = (typeof Position)[keyof typeof Position];

export const DropdownPosition = {
  Up: "up",
  Down: "down",
} as const;

export type DropdownPositionType =
  (typeof DropdownPosition)[keyof typeof DropdownPosition];

type GroupedOption<T> = {
  header: string;
  options: DropDownOption<T>[];
  disabled?: boolean;
};
export type DropDownOption<T> = {
  disabled?: boolean;
  value: T;
  toolTipText?: string;
};

export type CustomStylesType = {
  container?: CSSProperties;
  button?: CSSProperties;
  label?: CSSProperties;
  icon?: CSSProperties;
  itemsWrapper?: CSSProperties;
  header?: CSSProperties;
  item?: CSSProperties;
  placeholder?: CSSProperties;
};

export interface DropdownProps<T> {
  disabled?: boolean;
  type: DropdownType;
  menuType?: DropdownMenuType;
  options?: DropDownOption<T>[];
  groupedOptions?: GroupedOption<T>[];
  renderOption?: (option: DropDownOption<T>) => ReactNode;
  onSelect?: (option: DropDownOption<T>) => void;
  label?: string;
  placeholder?: string | ReactNode;
  initialValue?: DropDownOption<T> | null;
  dropdownIcon?: boolean;
  position: PositionType;
  customStyles?: CustomStylesType;
  equalityFn?: (
    optionA: DropDownOption<T> | null,
    optionB: DropDownOption<T> | null,
  ) => boolean;
}

const Dropdown = <T,>({
  disabled = false,
  type,
  menuType = "simple",
  options = [],
  groupedOptions = [],
  onSelect,
  renderOption = (option: DropDownOption<T>) => option.value?.toString(),
  label,
  placeholder,
  initialValue = null,
  dropdownIcon = false,
  position = Position.Bottom,
  customStyles = {},
  equalityFn = (
    optionA: DropDownOption<T> | null,
    optionB: DropDownOption<T> | null,
  ) => optionA === optionB,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<DropDownOption<T> | null>(() => {
      if (placeholder) return null;
      return initialValue || options[0] || null;
    });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPositionType>(DropdownPosition.Down);

  useEffect(() => {
    if (dropdownRef.current && isOpen) {
      const buttonRect = dropdownRef.current.getBoundingClientRect();
      const bottomSpace = window.innerHeight - buttonRect.bottom;
      setDropdownPosition(
        bottomSpace < 200 ? DropdownPosition.Up : DropdownPosition.Down,
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (type === "select" && !placeholder) {
      setSelectedOption(initialValue || options?.at(0) || null);
    }
  }, [initialValue]);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleItemClick = (item: DropDownOption<T>) => {
    if (onSelect) {
      onSelect(item);
    }
    if (type === "select") {
      setSelectedOption(item);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentOption = {
    select: selectedOption ? renderOption(selectedOption) : placeholder,
    button: placeholder,
  };

  const getDropdownOptions = (
    options: DropDownOption<T>[],
    disabled = false,
  ) => {
    return options.map((option, index) => {
      const isDisabled =
        disabled ||
        option.disabled ||
        (type === "select" && equalityFn(option, selectedOption));

      return (
        <SelectItemWrapper
          key={index}
          $isActive={isDisabled}
          onClick={!isDisabled ? () => handleItemClick(option) : undefined}
          style={customStyles.item}
        >
          {renderOption(option)}
        </SelectItemWrapper>
      );
    });
  };

  const getGroupedDropdownOptions = (groupedOptions: GroupedOption<T>[]) => {
    return groupedOptions.map((group, index) => (
      <div key={index}>
        {group.header && (
          <SelectHeaderItemWrapper
            key={index}
            style={customStyles.header}
            $isDisabled={group.disabled}
            $isActive={!group.disabled}
          >
            {group.header}
          </SelectHeaderItemWrapper>
        )}
        {getDropdownOptions(group.options, group.disabled)}
        {index < groupedOptions.length - 1 && <Divider />}
      </div>
    ));
  };

  const DropdownOptions =
    menuType === "simple"
      ? getDropdownOptions(options)
      : getGroupedDropdownOptions(groupedOptions);

  return (
    <DropdownContainer ref={dropdownRef} style={customStyles.container}>
      {label && (
        <StyledLabel
          data-testid="label"
          aria-label={label}
          style={customStyles.label}
        >
          {label}
        </StyledLabel>
      )}
      <CustomSelectButton
        onClick={toggleDropdown}
        disabled={disabled}
        style={customStyles.button}
      >
        <SelectWrapper style={customStyles.placeholder}>
          {currentOption[type]}
        </SelectWrapper>
        {dropdownIcon && (
          <IconWrapper disabled={disabled} style={customStyles.icon}>
            <StyledChevronDownIcon disabled={disabled} />
          </IconWrapper>
        )}
      </CustomSelectButton>
      {isOpen && (
        <SelectItemsWrapper
          position={position}
          $dropDownPosition={dropdownPosition}
          style={customStyles.itemsWrapper}
        >
          {DropdownOptions}
        </SelectItemsWrapper>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
