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

import React, { useContext } from 'react';

function ErrorModal() {
  const { error, clearError } = useContext(ErrorContext);

  if (!error) return null;

  return (
    <div className="error-modal">
      <h3>Error!</h3>
      <p>{error.message}</p>
      <button onClick={clearError}>Close</button>
    </div>
  );
}

export default ErrorModal;


import React, { useContext } from 'react';

function YourComponent() {
  const { error, setError } = useContext(ErrorContext);

  const handleApiCall = async () => {
    try {
      const response = await fetch('https://your-api.com/endpoint');
      // Process response
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>Make API Call</button>
      {error && <div>Error: {error.message}</div>}
      {/* Your component content */}
    </div>
  );
}

export default YourComponent;


import axios from 'axios';

// Get base API URL from environment variable
const BASE_URL = process.env.REACT_APP_API_URL;

// Define default headers
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// Function to add authorization header
const addAuthHeader = (token) => {
  defaultHeaders.Authorization = `Bearer ${token}`;
};

// Create an instance of Axios configured with base URL and headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

// Export the API client and base config object
export { apiClient, BASE_URL, addAuthHeader };

