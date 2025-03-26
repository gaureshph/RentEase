import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (username, email, password, role) => {
  try {
    console.log("Attempting registration with:", { username, email });
    const response = await axios.post(API_URL + 'signup', {
      username,
      email,
      password,
      role
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

const addRole = async (userId, role) => {
  try {
    console.log("Attempting to add role:", { userId, role });
    const response = await axios.post(API_URL + 'addrole', {
      userId,
      role
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  addRole
};

export default authService;
