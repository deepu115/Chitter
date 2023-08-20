import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../src/Components/Login';
import { MemoryRouter as Router } from 'react-router-dom';

vi.mock('axios');

describe('Login Component - API Calls', () => {

    const mockReload = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should make a successful API call on login', async () => {
        axios.post.mockResolvedValueOnce({ data: { token: 'sampleToken' } });

        render(
            <Router>
                <Login onClose={() => { }} onLogin={() => { }} reloadPageFunction={mockReload} />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'hpotter@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check the axios call
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/users/login', {
            email: 'hpotter@gmail.com',
            password: '12345678'
        }, expect.anything());
    });
    it('should display an error message on failed login', async () => {
        const mockError = "Invalid Username or Password";
        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    msg: mockError
                }
            }
        });
        render(
            <Router>
                <Login onClose={() => { }} onLogin={() => { }} reloadPageFunction={mockReload} />
            </Router>
        );
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'hpotter@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '9999999' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(mockError)).toBeInTheDocument();
    });
    it('should not make api call when fields are empty', () => {
        render(
            <Router>
                <Login onClose={() => { }} onLogin={() => { }} reloadPageFunction={mockReload} />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should navigate to signup page when clicked', () => {
        render(
            <Router>
                <Login onClose={() => { }} onLogin={() => { }} reloadPageFunction={vi.fn()} />
            </Router>
        );
        const linkElement = screen.getByText('Signup Now');
        expect(linkElement.closest('a')).toHaveAttribute('href', '/signup');
    });

});
