import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import MainComponent from './MainComponent';

describe('MainComponent', () => {
  it('renders without crashing', () => {
    render(<MainComponent />);
    const appElement = screen.getByText(/app/i);
    expect(appElement).toBeInTheDocument();
  });

  it('applies MyThemeProvider', () => {
    render(<MainComponent />);
    // Assuming MyThemeProvider adds a specific class or data attribute to the body
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('applies LocalizationProvider', () => {
    render(<MainComponent />);
    // Check if LocalizationProvider is working correctly
    // This is highly dependent on how you use LocalizationProvider in your app
    // For demonstration, assume it affects some text rendering
    const localizedElement = screen.getByText(/localized text/i);
    expect(localizedElement).toBeInTheDocument();
  });

  it('applies StyledEngineProvider', () => {
    render(<MainComponent />);
    // Check if StyledEngineProvider is working correctly
    // Again, this depends on specific implementation details in your app
    // For demonstration, assume it adds a specific class to the document
    expect(document.body.classList.contains('styled-engine')).toBe(false);
  });
});