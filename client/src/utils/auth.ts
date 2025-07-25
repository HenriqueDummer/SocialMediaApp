import axios from "axios";

export const checkAuthStatus = async (): Promise<boolean> => {
    try {
        const response = await axios.get('/auth/me');

        return response.status === 200;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
}