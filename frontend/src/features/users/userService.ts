import axios from 'axios'

const API_URL: string = 'http://localhost:5000/api/users/'; // Change this, horrible

const login = async (userData: {username: string, password: string}) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
};

const userService = {
    login,
    logout
}

export default userService;