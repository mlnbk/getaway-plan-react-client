import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { userStore } from './Stores/UserStore';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    // Reset store before each test
    userStore.reset();
  });

  it('renders the app component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders the header component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders the footer component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('navigates to the login page if the user is not authenticated', () => {
    userStore.setToken('');

    const { debug } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders the child routes if the user is authenticated', () => {
    userStore.setToken('test_token');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('child-routes')).toBeInTheDocument();
  });
});
