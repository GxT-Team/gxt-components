import React, { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/search.svg";

export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  onChangeCallback: (searchTerm: string) => void;
  className?: string;
  placeholder?: string;
  debounceTime?: number;
  width?: string;
  value?: string;
}

const SearchContainer = styled.div<{ width: string }>`
  display: flex;
  padding: 0.5625rem 0.8125rem;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;
  border-radius: 0.375rem;
  border: 1px solid var(--neutral-200, #9ca3af);
  background: var(--system-50, #fff);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  width: ${(props) => props.width || "100%"};

  &:hover {
    border: 1px solid var(--primary-100, #1c99ce);
  }

  &:focus-within {
    border: 2px solid var(--neutral-400, #414141);
    padding: calc(0.5625rem - 1px) calc(0.8125rem - 1px);
  }
`;

const SearchInput = styled.input<{ $isFilled: boolean }>`
  flex: 1 0 0;
  color: ${({ $isFilled }) =>
    $isFilled ? "var(--neutral-400, #414141)" : "var(--neutral-200, #9ca3af)"};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.00119rem;
  border: none;

  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    border: none;
  }
`;

const StyledSearch = styled(SearchIcon)<{ $isFilled: boolean }>`
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  justify-content: center;
  align-items: center;
  fill: ${({ $isFilled }) =>
    $isFilled ? "var(--neutral-300, #4B5563)" : "var(--neutral-200, #9ca3af)"};
`;

const Search: React.FC<SearchProps> = ({
  id,
  name,
  placeholder,
  className = "",
  onChangeCallback,
  debounceTime = 500,
  width = "20rem",
  value = "",
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onChangeCallback(searchTerm);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, debounceTime]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchContainer width={width} className={className}>
      <StyledSearch height={16} width={16} $isFilled={Boolean(searchTerm)} />
      <SearchInput
        {...rest}
        type="text"
        id={id || "search"}
        name={name || "search"}
        onChange={handleInputChange}
        placeholder={placeholder || "Search"}
        value={searchTerm}
        $isFilled={Boolean(searchTerm)}
        autoComplete="off"
        data-testid="search"
      />
    </SearchContainer>
  );
};

export default Search;
