import axios from "axios"

const API_BASE_URL = "https://api.ladyclinic.kg/api/v1"
function getCsrfToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  if (typeof window !== 'undefined') {

    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }

  }
  return cookieValue;
}
  const csrfToken = getCsrfToken();

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "Cookie": "csrftoken=vgox4qsC3p7Hus2dTQPDs5ecdaXy9MfE; ladyclinic_session=d3eox89v88q94gdsxl6cu0kh2t0mbnon",
    "X-CSRFToken": csrfToken,

  },
  // Если потребуется базовая аутентификация, можно добавить здесь:
  // auth: {
  //   username: 'your_username',
  //   password: 'your_password',
  // },
})

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken; // Добавляем CSRF токен
  }
  
  // Добавляем заголовок Accept-Language из localStorage
  if (typeof window !== 'undefined') {
    const language = localStorage.getItem('ladyclinic_language') || 'ru';
    config.headers["Accept-Language"] = language;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});
