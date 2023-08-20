import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Logout from '../src/Components/Logout';

describe('Logout Component', () => {

    const mockReload = vi.fn();

    afterEach(() => {
        localStorage.removeItem('token');
        vi.clearAllMocks();
    });

    it('should render the logout button when user is logged in', () => {

        render(<Logout reloadPageFunction={mockReload} />, { wrapper: Router });

        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should clear token and change state on logout', () => {
        localStorage.setItem('token', 'sampleToken');


        render(<Logout reloadPageFunction={mockReload} />, { wrapper: Router });

        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        expect(localStorage.getItem('token')).toBeNull();
    });
    it('should reload after the logout', () => {

        render(<Logout reloadPageFunction={mockReload} />, { wrapper: Router });
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        expect(mockReload).toHaveBeenCalled();

    })
});

