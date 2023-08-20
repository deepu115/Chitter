import axios from 'axios';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Peeps from '../src/Components/Peeps';
import { act } from 'react-dom/test-utils';
import mockData from './mockData.json'
import { MemoryRouter as Router } from 'react-router-dom';


vi.mock('axios');

describe('Peeps Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render text area and post button', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<Peeps isLoggedIn={false} setLoggedIn={() => { }} />);
        });
        expect(screen.getByPlaceholderText("What's happening?")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /peep/i })).toBeInTheDocument();
    });

    it('should call fetchPeeps on mount', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<Peeps isLoggedIn={false} setLoggedIn={() => { }} />);
        });
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/peeps');
    });
    it('should render peeps correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<Peeps isLoggedIn={false} setLoggedIn={() => { }} />);
        });
        expect(screen.getByText("This is a test peep.")).toBeInTheDocument();

    });
    it('should handle fetch errors gracefully', async () => {
        const originalConsoleError = console.error;
        console.error = () => { };
        const consoleErrorSpy = vi.spyOn(console, 'error');
        axios.get.mockRejectedValueOnce(new Error('Error fetching peeps'));
        render(<Peeps isLoggedIn={false} setLoggedIn={() => { }} />);
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching peeps:', expect.any(Error));
        });
        console.error = originalConsoleError;
    });
    it('should post peep when logged in', async () => {
        const mockPeepContent = 'This is a new test peep.';
        axios.get.mockResolvedValueOnce({ data: mockData });
        axios.post.mockResolvedValueOnce({});
        axios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<Peeps isLoggedIn={true} setLoggedIn={() => { }} />);
        });
        fireEvent.change(screen.getByPlaceholderText("What's happening?"), { target: { value: mockPeepContent } });
        fireEvent.click(screen.getByText('Peep'));

        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/peeps', { content: mockPeepContent }, expect.anything()));
    });
    it('should show login modal when trying to post peep while logged out', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<Router><Peeps isLoggedIn={false} setLoggedIn={() => { }} /></Router>);
        });
        fireEvent.click(screen.getByText('Peep'));
        expect(screen.getByText('Please login to post a Peep')).toBeInTheDocument();
    });
    it('should show login modal when posting peep results in unauthorized access', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        axios.post.mockRejectedValueOnce({
            response: {
                status: 401
            }
        });
        await act(async () => {
            render(<Router><Peeps isLoggedIn={false} setLoggedIn={() => { }} /></Router>);
        });
        fireEvent.click(screen.getByText('Peep'));
        await waitFor(() => expect(screen.getByText('Please login to post a Peep')).toBeInTheDocument());
    });
});
