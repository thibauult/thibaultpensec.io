import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

test('renders children in layout', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('lds-roller')
});