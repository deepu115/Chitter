import axios from 'axios';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { act } from 'react-dom/test-utils';
import mockData from './mockData.json'

vi.mock('Axios');
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
};

describe('Navbar Component', () => {
    beforeAll(() => {
        global.localStorage = mockLocalStorage;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should display the correct navbar items when the user is logged in', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        mockLocalStorage.getItem.mockImplementation(() => "mockTokenValue");
        await act(async () => {
            render(<App />);
        });
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Signup')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('should display the correct navbar items when the user is logged out', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });
        mockLocalStorage.getItem.mockImplementation(() => null);
        await act(async () => {
            render(<App />);
        });
        expect(screen.getByText('Signup')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
});
