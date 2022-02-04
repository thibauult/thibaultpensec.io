import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test('renders children in layout', () => {
    render(<Layout title={"Hello"}>Hello World</Layout>);
    const title = screen.getByText('Hello World')
    expect(title).toBeInTheDocument();
});