import _ from 'lodash';
import ApiRequest from './ApiRequest';

export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('loginTime');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  window.location.reload();
};

export const login = (email, password) =>
  ApiRequest.post('/users/login', { email, password })
    .then((res) => {
      const {
        token, _id, loginTime, name,
      } = res;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('loginTime', loginTime);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
    });

export const isAuthenticated = () => {
  const fields = ['jwtToken', 'userId', 'loginTime', 'userName', 'userEmail'];
  return _.every(fields, f => !!localStorage.getItem(f));
};

export const getAuthHeaders = () => ({
  authorization: localStorage.getItem('jwtToken'),
});