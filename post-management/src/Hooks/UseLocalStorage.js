import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // Initialize state with localStorage value or fallback
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error); // ✅ backticks
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error); // ✅ backticks
    }
  }, [key, value]);

  // Enhanced setter that accepts function or value
  const setStoredValue = (val) => {
    try {
      const valueToStore = val instanceof Function ? val(value) : val;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error); // ✅ backticks
    }
  };

  return [value, setStoredValue];
}
