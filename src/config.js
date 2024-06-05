export const BASE_URL = "https://65e6-2401-4900-1f39-23c4-b785-b939-c8c3-5294.ngrok-free.app/"
// const user_data = localStorage.getItem('login_user');
// const current_user = JSON.parse(user_data);



export const getCurrentUser = () => {
  const userData = localStorage.getItem('login_user');
  return userData ? JSON.parse(userData) : null;
};