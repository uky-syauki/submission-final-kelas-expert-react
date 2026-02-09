/**
 * scenario testing
 *
 * - ThreadInput component
 *  - should handle body type correctly
 *  - should handle title type correctly
 *  - should handle category type correctly
 *  - should call onAddThread function when Create Thread button is clicked
 */
import React from 'react';
import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ThreadInput from './ThreadInput';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle body type correctly', async () => {
    // arrange
    render(<ThreadInput onAddThread={() => {}} showInput={true} setShowInput={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Tulis sesuatu... (maksimal 1000 karakter)');

    // action
    await userEvent.type(bodyInput, 'Body test');

    // assert
    expect(bodyInput).toHaveValue('Body test');
  });

  it('should handle title type correctly', async () => {
    // arrange
    render(<ThreadInput onAddThread={() => {}} showInput={true} setShowInput={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Judul Diskusi');

    // action
    await userEvent.type(titleInput, 'Test title');

    // assert
    expect(titleInput).toHaveValue('Test title');
  });

  it('should handle category type correctly', async () => {
    // arrange
    render(<ThreadInput onAddThread={() => {}} showInput={true} setShowInput={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Kategori Diskusi');

    // action
    await userEvent.type(categoryInput, 'Test category');

    // assert
    expect(categoryInput, 'Test category');
  });

  it('should call onAddThread function when Create Thread button is clicked', async () => {
    // arrange
    const mockCreateThread = vi.fn();
    render(<ThreadInput onAddThread={mockCreateThread} showInput={true} setShowInput={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Tulis sesuatu... (maksimal 1000 karakter)');
    await userEvent.type(bodyInput, 'Body test');
    const titleInput = await screen.getByPlaceholderText('Judul Diskusi');
    await userEvent.type(titleInput, 'Test title');
    const categoryInput = await screen.getByPlaceholderText('Kategori Diskusi');
    await userEvent.type(categoryInput, 'Test category');
    const createThreadButton = await screen.getByRole('button', { name: 'Thread' });

    // action
    await userEvent.click(createThreadButton);

    // assert
    expect(mockCreateThread).toBeCalledWith({
      body: 'Body test',
      title: 'Test title',
      category: 'Test category',
    });
  });
});