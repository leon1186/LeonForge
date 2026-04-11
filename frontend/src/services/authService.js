const API_URL = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    const token = data.result.token;
    const user = data.result.user;

    localStorage.setItem(TOKEN_KEY, token);

    return {
      success: true,
      token,
      user,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const register = async (
  firstName,
  lastName,
  username,
  password,
  email,
) => {
  try {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, username, password, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const data = await response.json();
    const token = data.result.token;
    const user = data.result.user;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return {
      success: true,
      token,
      user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Token ${token}` }),
  };
};

export default {
  login,
  register,
  logout,
  getToken,
  getUser,
  isAuthenticated,
  getAuthHeaders,
};
