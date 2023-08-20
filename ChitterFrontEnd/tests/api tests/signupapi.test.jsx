import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../../src/Components/Signup';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';



vi.mock('axios');

describe('Signup Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('should make a successful API call on form submission', async () => {
        axios.post.mockResolvedValueOnce({ data: {} });

        render(
            <Router>
                <Signup />
            </Router>
        );

        fireEvent.change(screen.getAllByLabelText(/name/i)[0], { target: { value: 'Harry Potter' } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'harry' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'hpotter@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /signup/i }));
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/users/signup', {
            name: 'Harry Potter',
            username: 'harry',
            email: 'hpotter@gmail.com',
            password: '12345678'
        }, expect.anything());
    });
    it('should display an error message on failed API call', async () => {
        const mockError = "Signup failed!";
        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    msg: mockError
                }
            }
        });

        render(
            <Router>
                <Signup />
            </Router>
        );
        fireEvent.change(screen.getAllByLabelText(/name/i)[0], { target: { value: 'Harry Potter' } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'harry' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'hpotter@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });
        fireEvent.click(screen.getByRole('button', { name: /signup/i }));
        expect(await screen.findByText(mockError)).toBeInTheDocument();
    });
    it('should not make an API call if the form is submitted with empty fields', async () => {
        render(
            <Router>
                <Signup />
            </Router>
        );
        fireEvent.click(screen.getByRole('button', { name: /signup/i }));
        expect(axios.post).not.toHaveBeenCalled();
    });

    it('should have a link that navigates to the homepage for existing users', () => {
        render(
            <Router>
                <Signup />
            </Router>
        );
        const linkElement = screen.getByText('Homepage');
        expect(linkElement.closest('a')).toHaveAttribute('href', '/');
    });
    it('should display an error message', async () => {
        const mockErrorMessage = "Email already registered";
        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    msg: mockErrorMessage
                }
            }
        });

        render(
            <Router>
                <Signup />
            </Router>
        );
        fireEvent.change(screen.getAllByLabelText(/name/i)[0], { target: { value: 'Harry Potter' } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'harry' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'hpotter@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });
        fireEvent.click(screen.getByRole('button', { name: /signup/i }));
        expect(await screen.findByText(mockErrorMessage)).toBeInTheDocument();
    });
});
