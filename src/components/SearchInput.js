import React, { useState } from 'react';
import styled from 'styled-components';
import useDebounce from './useDebounce';

const InputSearch = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 30px;
`;

const SearchInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <InputSearch
      type="search"
      value={displayValue}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
