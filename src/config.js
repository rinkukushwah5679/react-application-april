export const BASE_URL = "https://030c-2401-4900-1c5a-8bf8-3a18-da19-fd96-a0ab.ngrok-free.app/"
// const user_data = localStorage.getItem('login_user');
// const current_user = JSON.parse(user_data);



export const getCurrentUser = () => {
  const userData = localStorage.getItem('login_user');
  return userData ? JSON.parse(userData) : null;
};