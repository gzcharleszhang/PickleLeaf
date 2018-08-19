const logout = () => {
  localStorage.removeItem('jwtToken');
  window.location.reload();
};

const isAuthenticated = () => localStorage.getItem('jwtToken');

module.exports = {
  logout,
  isAuthenticated,
};
