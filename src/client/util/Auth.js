import apiRequest from 'client/util/ApiRequest';

export const logout = () => {
  localStorage.removeItem('jwtToken');
  window.location.reload();
};

export const isAuthenticated = () => !!localStorage.getItem('jwtToken');

export const getAuthHeaders = () => ({
  authorization: localStorage.getItem('jwtToken'),
});

export const registerUser = user => apiRequest.post('/users/register', user);
