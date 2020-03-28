import React from 'react';
import { render } from '@testing-library/react';
import {RootSession} from './App';

test('renders learn react link', () => {
  const { getByText } = render(<RootSession />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
