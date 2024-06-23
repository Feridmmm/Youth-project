import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  });
  const getCsrfToken = async () => {
    const response = await fetch('http://localhost:8000/api/csrf/', {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
  };

  const signup = async (username, email, password, address, zip_code) => {
    const csrfToken = await getCsrfToken();
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ username, email, password, address, zip_code }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.error);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email, password) => {
    const csrfToken = await getCsrfToken();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem('user');
        return true;
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.error);
        return false;
      }
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  const updateUser = async (updateData) => {
    const csrfToken = await getCsrfToken();
    try {
      const response = await axios.put(`http://localhost:8000/api/user/update/${user.id}/`, updateData, {
        
        withCredentials: true,
        headers: {
          // 'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        }
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        const errorData = await response.json();
        console.error('Update failed:', errorData.error);
        return false;
      }
    } catch (error) {
      console.log('Update error:', error);
      return false;
    }
  };

  const saveItem = async (item) => {
    const csrfToken = await getCsrfToken();
    try {
      const response = await fetch(`http://localhost:8000/api/user/${item.id}/save_item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(item),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        const errorData = await response.json();
        console.error('Save item failed:', errorData.error);
        return false;
      }
    } catch (error) {
      console.error('Save item error:', error);
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        credentials: 'include',
      });
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Fetch user data error:', error);
    }
  };

  React.useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    updateUser,
    saveItem,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
