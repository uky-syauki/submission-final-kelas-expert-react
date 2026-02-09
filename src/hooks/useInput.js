import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  function handleChange({ target }) {
    setValue(target.value);
  }

  return [value];
}

export default useInput;