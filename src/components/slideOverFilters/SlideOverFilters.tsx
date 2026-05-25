import React, { FC, useEffect } from "react";

import SlideOver from "../slideOver/SlideOver";
import { Button } from "../button";
import {
  SlideOverFooter,
  SlideOverFooterRight,
  SlideOverHeader,
} from "./SlideOverFilters.styles";
import Filter from "./Filter";

type FilterCheckboxOptions = {
  label: string;
  name: string;
  value: string | number;
  checked?: boolean;
  onChange?: (filters: Record<string, string[]>) => void;
};

export type FilterOptions = {
  header: string;
  isSearchAble: boolean;
  isAccordionOpen: boolean;
  checkboxOptions: FilterCheckboxOptions[];
  onChangeCallback: () => void;
};

type SlideOverFiltersProps = {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  filtersOptions?: FilterOptions[];
  resetButtonLabel?: string;
  applyButtonLabel?: string;
  closeButtonLabel?: string;
  onCloseHandler?: () => void;
  onApplyHandler?: () => void;
  onResetHandler?: () => void;
  width?: string;
  mountElementId?: string;
};

const SlideOverFilters: FC<SlideOverFiltersProps> = ({
  title = "Filters Templates",
  filtersOptions = [],
  isOpen,
  resetButtonLabel = "Clear Selection",
  applyButtonLabel = "Filter",
  closeButtonLabel = "Close",
  onCloseHandler = () => {},
  onApplyHandler = () => {},
  onResetHandler = () => {},
  width = "25rem",
  mountElementId = "root",
}) => {
  const [filters, setFilters] = React.useState<Record<string, string[]>>({});
  useEffect(() => {
    setFilters(
      filtersOptions.reduce(
        (acc, curr) => {
          const optionFilters = curr.checkboxOptions.reduce(
            (checkboxAcc, checkboxOption) => {
              if (checkboxOption.checked) {
                checkboxAcc[checkboxOption.name] = [
                  ...(checkboxAcc[checkboxOption.name] || []),
                  checkboxOption.value.toString(),
                ];
              } else {
                checkboxAcc[checkboxOption.name] = (
                  checkboxAcc[checkboxOption.name] || []
                ).filter((option) => option !== checkboxOption.value);
              }
              return checkboxAcc;
            },
            {} as Record<string, string[]>,
          );
          return { ...acc, ...optionFilters };
        },
        {} as Record<string, string[]>,
      ),
    );
  }, [filtersOptions]);

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cb?: (filters: Record<string, string[]>) => void,
  ) => {
    const { name, checked, value } = event.target;
    const newFilters = {
      ...filters,
      [name]: checked
        ? filters[name]
          ? [...filters[name], value]
          : [value]
        : filters[name]?.filter((v) => v.toString() !== value),
    };
    setFilters(newFilters);
    if (cb) {
      cb(newFilters);
    }
  };

  const handleReset = () => {
    setFilters((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => {
          return { ...acc, [key]: [] };
        },
        {} as Record<string, string[]>,
      ),
    );
    onResetHandler();
  };

  return (
    <SlideOver
      width={width}
      isOpen={isOpen}
      onClose={onCloseHandler}
      mountElementId={mountElementId}
    >
      <SlideOverHeader>{title}</SlideOverHeader>
      {filtersOptions.map((accordionItem, index) => (
        <Filter
          {...accordionItem}
          key={index}
          handleCheckBoxChange={handleCheckBoxChange}
          filters={filters}
        />
      ))}
      <SlideOverFooter>
        <Button variant="secondary" onClick={handleReset}>
          {resetButtonLabel}
        </Button>

        <SlideOverFooterRight>
          <Button variant="primary" onClick={onApplyHandler}>
            {applyButtonLabel}
          </Button>
          <Button variant="secondary" onClick={onCloseHandler}>
            {closeButtonLabel}
          </Button>
        </SlideOverFooterRight>
      </SlideOverFooter>
    </SlideOver>
  );
};

export default SlideOverFilters;
