import React, { useState, createContext } from 'react';
import ErrorModal from './ErrorModal';
import YourComponent from './YourComponent'; // Your component that makes API calls

const ErrorContext = createContext({
  error: null,
  setError: () => {},
});

function App() {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <>
        <ErrorModal error={error} onClear={clearError} />
        <YourComponent />
      </>
    </ErrorContext.Provider>
  );
}

export default App;
