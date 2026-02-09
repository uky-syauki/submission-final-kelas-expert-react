/**
 * scenario testing
 *
 * - LoginInput component
 *  - should handle email type correctly
 *  - should handle password type correctly
 *  - should call login function when login button is clicked
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LoginInput from './LoginInput';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email type correctly', async () => {
    // arrange
    render(<MemoryRouter><LoginInput login={() => {}} /></MemoryRouter>);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'achmad.uky@gmail.com');

    // assert
    expect(emailInput).toHaveValue('achmad.uky@gmail.com');
  });

  it('should handle password type correctly', async () => {
    // arrange
    render(<MemoryRouter><LoginInput login={() => {}} /></MemoryRouter>);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'daftar123');

    // assert
    expect(passwordInput).toHaveValue('daftar123');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<MemoryRouter><LoginInput login={mockLogin} /></MemoryRouter>);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'achmad.uky@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'daftar123');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'achmad.uky@gmail.com',
      password: 'daftar123',
    });
  });
});